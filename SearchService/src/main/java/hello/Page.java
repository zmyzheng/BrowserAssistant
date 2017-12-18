package hello;

import java.util.Date;

public class Page {

    private String uid;
    private String url;
    private String content;
    private String ip;
    private String time;

    public Page(String uid, String url, String content, String ip, String time) {
        this.uid = uid;
        this.url = url;
        this.content = content;
        this.ip = ip;
        this.time = time;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
