package com.websocket.ChatApp.model;

public class Message {

    private String text;
    private String fromUser;
    private TypeMessage type;

        public enum TypeMessage {
        mesaj, katil, ayril
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getFromUser() {
        return fromUser;
    }

    public void setFromUser(String fromUser) {
        this.fromUser = fromUser;
    }

    public TypeMessage getType() {
        return type;
    }

    public void setType(TypeMessage type) {
        this.type = type;
    }
}
