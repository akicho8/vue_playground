#!/bin/sh
ffmpeg -y -i music1.mp3 music1.ogg
ffmpeg -y -i music1.mp3 music1.wav
ffmpeg -y -i music1.mp3 -dash 1 music1.webm
ffmpeg -y -i music1.mp3 music1.mp4
ls -al music1.*
