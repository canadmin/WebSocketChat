package com.websocket.ChatApp.controller;

import com.websocket.ChatApp.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;

@org.springframework.stereotype.Controller("/api")
public class Controller {


    @MessageMapping("/global.register")
    @SendTo("/konu/public")
    public Message regs(@Payload Message message, SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
        simpMessageHeaderAccessor.getSessionAttributes().put("kullanici", message.getFromUser());
        return message;
    }

    @MessageMapping("global.send")
    @SendTo("/konu/public")
    public Message send(@Payload Message message) {
        return message;
    }
}
