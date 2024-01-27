
# Coder Stream

For English description [click](readme-en.md)

Bu proje ffmpeg veya obs üzerinden docker ile oluşturacağınız kendi sunucunuza yayın yapmanızı sağlar.

Env Kullanmak istemedim, çünkü birbirine bağlı bir yapı ve tek bir dosyada bulunuyor bunun için `Genel Bilgiler` bölümünden ortam değişkenlerine ulaşabilirsiniz. Pull request göndermekten çekinmeyin.

## Genel Bilgiler
- Yayın Anahtarı: `test?key=supersecret`
- Rtmp Sunucusu: rtmp://localhost:1935/live`
- Frontend Url: http://localhost:3000
- Backend Url: http://localhost:8000 veya http://auth_server:8000


## Neyi Neden Yaptım?
Aşağıdaki özet açıklamalar ile projenin mantığını biraz anlatmak istiyorum. 

### Front-End
- Güncel teknoloji kullanmak istememden kaynaklı olarak, front end tarafını nextjs ile yapmaya karar verdim.
- İlerleyen dönemde websocket ile chat sistemi eklenebilir.
- HMR dan faydalanılabilir.

### Backend
- Backend tarafında, authentication işlemi yaptırıyorum şimdilik.
- Rtmp sunucusuna gelen istekleri, nodejs server ile ara katmana alıyor ve birnevi yayın anahtarı kontrolü yapıyorum.

### Nginx
- Nginx tarafında ise, 1935 portunu ve 8080 portunu açıyorum. 
- 1935 portu, obs üzerinden veya ffmpeg ile bana bir videoyu yada canlı olarak kameramı yayınlayabilmemi sağlıyor.
- 8080 portu, oluşan hls dosyalarına erişebilmem için gerekli.
- `hls_fragment 5s;` ile her 5 saniyede bir yeni bir dosya oluşturuyorum.
- `hls_playlist_length 30s;` ile play list uzunluğunu belirliyoruz, yani eski oluşan dosyaları biryandan siliyor.
- Daha fazla detay için, proje dosyalarından nginx.conf` dosyasına gözatabilirsiniz.


## Nasıl Çalışır
Öncelikle cihazınızda `docker` olması gerekmektedir.

- Önce Klonlayalım
```bash 
https://github.com/hopesf/CoderStream.git
```

- Klonladığınız dizine terminalde gidin.
```bash
cd CoderStream
```

- docker ile build alalım.
```bash
docker compose build
```

- docker up komutu ile projeyi başlatalım.
```bash
docker compose up
```

### Ffmpeg Komutları İle Streaming

#### Bilgisayar Kamerası İle Canlı Yayın yapmak
- Bilgisayardaki mikrofon ve kamera cihazını bulmak için, aşağıdaki komut ile cihazdaki kamera ve mikrofon aygıtlarının sayılarını bulup, aşağıdaki ffmpeg scriptinde `"0:0"` alanını, cihazın sayıları ile değiştirin.

- Macbook kullanıcıları için ffmpeg ile, bilgisayar kamerasını kullanarak canlı yayın stream etmek. Gerekli parametreleri kendinize göre değiştirebilirsiniz.

```bash
ffmpeg -f avfoundation -list_devices true -i ""
```

- Not: `192.168.1.158` local ip adresiniz sizde muhtemelen farklıdır, bunu öğrenmek için windows'da `ipconfig` diğer işletim sistemlerinde `ifconfig` ile bilgisayarınızın local ip adresini bulup değiştirmeniz önemlidir.

```bash
ffmpeg -f avfoundation -framerate 30 -video_size 1280x720 -i "0:0" -vcodec libx264 -preset fast -tune zerolatency -b:v 2500k -acodec aac -b:a 192k -ar 48000 -f flv rtmp://192.168.1.158:1935/live/test
```

#### Bilgisayardaki Mp4 Videoyu Stream Etmek
- Example.mp4 dosyasının adını değiştirerek, bu ffmpeg scriptini kullanabilirsiniz.
```bash
ffmpeg -re -i example.mp4 -c:v libx264 -preset fast -c:a aac -f flv rtmp://192.168.1.158:1935/live/test
```

### OBS Programı İle Streaming
- Obs programını indirin, Kaynaklar bölümü altında artı ikonuna basın, `Video Yakalama Aygıtı` seçeneğini seçin ve açılan pencereden kameranızı seçmeniz gerekli.
- Yukarıdaki madde yapıldıktan sonra, kendinizi başarıyla programın ekranında görmelisiniz.
- Sonrasında sağ alt'da bulunan `ayarlar` kısmını açalım. 
- `Genel` bölümünün altında yayın sekmesine tıklayın.
- `Hizmet türü` nü özel yapmalısınız.
- `Sunucu Adresi` bölümüne `rtmp://localhost:1935/live` rtmp serverimizi yazıyoruz.
- `Yayın Anahtarı` bölümüne ise belirlediğimiz yayın anahtarını yazabiliriz. (Eğer doğru anahtar girilmezse yayını açamazsınız!)