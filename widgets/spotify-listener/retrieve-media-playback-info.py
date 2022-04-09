# https://stackoverflow.com/questions/65011660/how-can-i-get-the-title-of-the-currently-playing-media-in-windows-10-with-python

import asyncio
import sys
from winrt.windows.media.control import GlobalSystemMediaTransportControlsSessionManager as MediaManager
from winrt.windows.storage.streams import DataReader, Buffer, InputStreamOptions
import os
import json
import time

parent = os.path.dirname(os.path.abspath(__file__))

async def get_current_session():
    sessions = await MediaManager.request_async()
    current_session = sessions.get_current_session()
    return current_session

async def retrieve():
    global media

    sessions = await MediaManager.request_async()
    current_session = sessions.get_current_session()
    if current_session:
        info = await current_session.try_get_media_properties_async()
        info_dir = {song_attr: info.__getattribute__(song_attr) for song_attr in dir(info) if song_attr[0] != "_"}
        info_dir["genres"] = list(info_dir["genres"])

        timeline_properties = current_session.get_timeline_properties()
        timeline_position = str(timeline_properties.position.duration)[:-7]
        timeline_duration = str(timeline_properties.end_time.duration)[:-7]
        info_dir["timeline_position"] = timeline_position
        info_dir["timeline_duration"] = timeline_duration

        return info_dir

def get_thumbnail(thumbnail):
    async def read_stream_into_buffer(stream_ref, buffer):
        readable_stream = await stream_ref.open_read_async()
        readable_stream.read_async(buffer, buffer.capacity, InputStreamOptions.READ_AHEAD)

    thumb_read_buffer = Buffer(5000000)
    asyncio.run(read_stream_into_buffer(thumbnail, thumb_read_buffer))

    buffer_reader = DataReader.from_buffer(thumb_read_buffer)
    byte_buffer = buffer_reader.read_bytes(thumb_read_buffer.length)

    with open(parent + "\\media\\album-cover.jpg", "wb+") as fobj:
        fobj.write(bytearray(byte_buffer))

# main

if len(sys.argv) > 1:
    if sys.argv[1] == "toggle":
        try:
            current_session = asyncio.run(get_current_session())
            current_session.try_toggle_play_pause_async()
            sys.stdout.write("1")
        except:
            pass
    elif sys.argv[1] == "loop":
        while True:
            media = asyncio.run(retrieve())
            try:
                get_thumbnail(media["thumbnail"])
                media = {song_attr: media[song_attr] for song_attr in media if song_attr != "thumbnail"}
                with open(parent + "\\result.json", "w") as file:
                    json.dump(media, file)
                time.sleep(0.1)
            except:
                pass
    elif sys.argv[1] == "skip-back":
        try:
            current_session = asyncio.run(get_current_session())
            current_session.try_skip_previous_async()
            sys.stdout.write("1")
        except:
            pass
    elif sys.argv[1] == "skip-forward":
        try:
            current_session = asyncio.run(get_current_session())
            current_session.try_skip_next_async()
            sys.stdout.write("1")
        except:
            pass
    elif sys.argv[1] == "rewind":
        try:
            current_session = asyncio.run(get_current_session())
            current_session.try_rewind_async()
            sys.stdout.write("1")
        except:
            pass
