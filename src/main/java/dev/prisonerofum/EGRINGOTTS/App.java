package dev.prisonerofum.EGRINGOTTS;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class App {
    public static void main(String[] args) {
        // Display the IP address of the current machine
        try {
            InetAddress ip = InetAddress.getLocalHost();
            System.out.println("Your current IP address : " + ip.getHostAddress());
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
    }
}
