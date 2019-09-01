package com.websocket.ChatApp.business;

import com.websocket.ChatApp.model.Message;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {


    @Override
    public List<Message> getAllMessages() {
        return null;
    }

    @Override
    public void sendMessage(Message message) {

    }
}
