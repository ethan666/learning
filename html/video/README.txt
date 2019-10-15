视频流畅播放，改进方案：

1. 确保视频码率不要太高。录制的视频常见比例是16：9，视频码率选择：720p（1280*720）、360p（640*360）等
2. 录制的视频可能横屏、竖屏，转码的时候需要考虑。
3. 使用ffmpeg转码，勘察外业采集项目使用java库javacv（封装了ffmpeg）转码
使用命令行转码，将输入的1920x1080缩小到960x540输出:
ffmpeg -i input.mp4 -vf scale=960:540 output.mp4 
//ps: 如果540不写，写成-1，即scale=960:-1, 那也是可以的，ffmpeg会通知缩放滤镜在输出时保持原始的宽高比。




参考链接：
视频点播概述
https://blog.csdn.net/wydyd110/article/details/86742608
利用nginx搭建RTMP视频点播、直播、HLS服务器
https://blog.csdn.net/kingroc/article/details/50839994
FFmpeg 的介绍与使用
https://blog.csdn.net/u011330638/article/details/82392268
ffmpeg 命令行转码案例
https://blog.csdn.net/n66040927/article/details/80880606