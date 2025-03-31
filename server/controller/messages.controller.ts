import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import { getSocketId, io } from "../socket/index.js";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const userId = req.user?.id;

    if (!userId || !receiverId) {
      res.status(400).json({ error: "Bad request" });
    }

    let conversation = await prisma.conversation.findFirst({
      where: { participantIds: { hasEvery: [userId, receiverId] } },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantIds: [userId, receiverId],
        },
      });

      // Update users' conversationIds arrays
      await prisma.user.updateMany({
        where: { id: { in: [userId, receiverId] } },
        data: {
          conversationsIds: {
            push: conversation.id, // Push new conversation ID into array
          },
        },
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        senderId: userId,
        conversationId: conversation.id,
      },
    });

    // In Prisma, relationships are not automatically updated when you insert a related record.
    // The messages array in the Conversation model does not auto-update when a message is inserted.
    // Hence this step is needed.
    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: { id: conversation.id },
        // Find the conversation and attach this new message (newMessage.id) to its messages relation
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });
    }

    // emit the new message to the receiver's socket
    const receiverSocketId = getSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", {
        ...newMessage,
      });
    }

    res.status(200).json({ message: newMessage });
  } catch (error) {
    console.log("Error in sendMessage controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: receiverId } = req.params;
    const userId = req.user?.id;

    const conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [userId, receiverId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!conversation) {
      res.status(404).json({ messages: [] });
      return;
    }

    res.status(200).json({ messages: conversation?.messages });
    return;
  } catch (error) {
    console.log("Error in getMessage controller", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

export const getUsersForSidebar = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.user;
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: id,
        },
      },
      select: {
        id: true,
        fullName: true,
        profilePic: true,
      },
    });
    res.status(200).json({ users });
    return;
  } catch (error) {
    console.log("Error in getUsersForSidebar controller", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};
