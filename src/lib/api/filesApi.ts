import { Platform } from "react-native";
import request from "."

export const filesApi = {
    upload: ({ file }) => {
        console.log(file);
        const uri = Platform.OS === "android" ? file : file.replace("file://", "");
        let data = new FormData();
        data.append("file", {
            // @ts-ignore
            // name: "id-image.jpeg",
            // type: "image/jpeg",
            uri: uri,
        });
        return request.post("/files/image-upload", data)
    },
}