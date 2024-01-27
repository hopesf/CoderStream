# Coder Stream

Türkçe anlatım için [tıklayın](readme.md)

This project allows you to broadcast over ffmpeg or obs to your own server that you create with docker.

I didn't want to use Env, because it's an interconnected structure and it's in a single file, so you can find the environment variables in the `General Information` section. Feel free to send a pull request.

## General Information
- Publication Key: `test?key=supersecret`
- Rtmp Server: rtmp://localhost:1935/live`
- Frontend Url: http://localhost:3000
- Backend Url: http://localhost:8000 or http://auth_server:8000


## What did I do and why?
I would like to explain the logic of the project a bit with the following brief explanations. 

#### Front-End
- Due to the fact that I want to use current technology, I decided to do the front end side with nextjs.
- In the future, chat system can be added with websocket.
- HMR can be utilized.

#### Backend
- On the backend side, I am doing authentication for now.
- I am taking the requests coming to the rtmp server to the middle layer with nodejs server and doing some kind of broadcast key control.

### Nginx
- On the Nginx side, I open port 1935 and port 8080. 
- The 1935 port allows me to stream a video or my camera live via obs or ffmpeg.
- The 8080 port allows me to access the generated hls files.
- With `hls_fragment 5s;` I create a new file every 5 seconds.
- With `hls_playlist_length 30s;` we set the length of the playlist, so it deletes the old files from the side.
- For more details, you can check the `nginx.conf` file in the project files.


## How it works
First of all, you must have `docker` on your device.

- Let's Clone First
```bash 
https://github.com/hopesf/CoderStream.git
```

- Go to the directory you cloned in the terminal.
```bash
cd CoderStream
```

- Let's build with docker.
```bash
docker compose build
```

- Let's start the project with the docker up command.
```bash
docker compose up
```

### Streaming with Ffmpeg Commands

#### Live Streaming with Computer Camera
- To find the microphone and camera device on the computer, use the following command to find the numbers of the camera and microphone devices on the device and replace the `"0:0"` field with the numbers of the device in the ffmpeg script below.

- Using ffmpeg for Macbook users to stream a live stream using the computer camera. You can change the required parameters to your own.

```bash
ffmpeg -f avfoundation -list_devices true -i ""
```

- Note: Your local ip address `192.168.1.158` is probably different, it is important to find and change the local ip address of your computer with `ipconfig` in windows and `ifconfig` in other operating systems.

```bash
ffmpeg -f avfoundation -framerate 30 -video_size 1280x720 -i "0:0" -vcodec libx264 -preset fast -tune zerolatency -b:v 2500k -acodec aac -b:a 192k -ar 48000 -f flv rtmp://192.168.1.158:1935/live/test
```

#### Stream Mp4 Video on Computer
- By renaming the file Example.mp4, you can use this ffmpeg script.
```bash
ffmpeg -re -i example.mp4 -c:v libx264 -preset fast -c:a aac -f flv rtmp://192.168.1.158:1935/live/test
```

### Streaming with OBS Program
- Download the Obs program, press the plus icon under the Resources section, select the `Video Capture Device` option and select your camera from the pop-up window.
- Once the above item is done, you should successfully see yourself on the program screen.
- Then open the `settings` section at the bottom right. 
- Under the `General` section, click on the broadcast tab.
- You need to set the `Service type` to private.
- In the `Server Address` section we write our `rtmp://localhost:1935/live` rtmp server.
- In the `Broadcast Key` section we can enter the broadcast key we have set (if the correct key is not entered you will not be able to open the broadcast!)