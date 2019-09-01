package com.websocket.ChatApp.business;

import com.websocket.ChatApp.model.Message;

import java.util.List;

public interface MessageService {

    List<Message> getAllMessages();

    void sendMessage(Message message);
}
