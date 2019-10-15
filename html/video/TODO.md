## 流媒体播放技术预研步骤

1. 了解上传的视频格式 (mp4, 3gp, mov)
2. 服务器端是否需要转视频格式，需要转哪几种输出格式。
3. 实际应用过程，可能需要租赁 CDN 服务，需要考虑带宽。
4. 服务器端需要怎么支持，搭建流媒体服务器？
5. 是否需要做防盗链下载
6. 文件服务器支持边下边播，跟视频格式有关、跟服务器也有关系
7. Helix Media Server 和 NTV Media Server，一个是国外产品，一个是国内产品。还有开源产品，如 Red5(java),Live555(c++) 等
8. 流媒体服务器使用 Red5，了解服务器带宽，支持多少同时在线观看人数
9. 搭建文件服务器或者 web 服务，搭建 red5

## 视频文件：

对最终用户而言，其只关心视频的文件大小和画面质量。
其中画面质量包括：分辨率，清晰度和流畅度。
流畅度：这个因素相对独立，其影响因素就是视频帧率（FPS）
分辨率：视频画面大小
清晰度：单位面积的画面所承载的信息，在对视频进行评价是就是当 FPS 和分辨率固定时，考察视频的清晰度。
————————————————
版权声明：本文为 CSDN 博主「微岩」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/matrix_laboratory/article/details/56291742

https://blog.csdn.net/matrix_laboratory/article/details/56291742

视频文件画面质量

分辨率不用太高

## mp4

分辨率：1920x1080
总比特率：16869kbps
帧速率：29.82 帧/秒

## mov

总比特率：4640kbps

## 3gp

分辨率：176x144
总比特率：217kbps
帧速率：15 帧/秒

https://cloud.tencent.com/developer/section/1259239

1. 基于 nginx 搭建，而 nginx 本身对音视频媒体的处理就有一定的支持，官方就有 flv 和 mp4 的插件，即 ngx_http_flv_module 和 ngx_http_mp4_module。

http://hsdfas.fubangnet.com/group1/M00/01/EE/wKgB6V13QtmAde_xAHtHrvdAiWo152.mp3

https://hsdfas.fubangnet.com/gateway/fastdfs/file/core/download?fileId=group1/M00/01/EE/wKgB6V13QqKAB9UJAAAtjZ8uZf0658.png

ffmpeg
