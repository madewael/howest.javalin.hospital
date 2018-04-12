package be.howest.ti.howest.hospital.api;

import io.javalin.Javalin;

public class APIServer {

    public static void main(String[] args) {
        new APIServer().run();
    }

    private void run() {
        Javalin app = Javalin.create().enableStaticFiles("web").port(8000).start();
    }

}
