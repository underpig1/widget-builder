# https://stackoverflow.com/questions/65011660/how-can-i-get-the-title-of-the-currently-playing-media-in-windows-10-with-python

import asyncio
import sys
from winrt.windows.media.control import GlobalSystemMediaTransportControlsSessionManager as MediaManager
from winrt.windows.storage.streams import DataReader, Buffer, InputStreamOptions
import os

async def get_current_session():
    sessions = await MediaManager.request_async()
    current_session = sessions.get_current_session()
    return current_session

async def retrieve():
    sessions = await MediaManager.request_async()
    current_session = sessions.get_current_session()
    if current_session:
        info = await current_session.try_get_media_properties_async()
        info_dir = {song_attr: info.__getattribute__(song_attr) for song_attr in dir(info) if song_attr[0] != "_"}
        info_dir["genres"] = list(info_dir["genres"])
        return info_dir
    return

async def get_timeline_position():
    sessions = await MediaManager.request_async()
    current_session = sessions.get_current_session()
    timeline_properties = current_session.get_timeline_properties()
    timeline_position = str(timeline_properties.position.duration)[:-7]
    return timeline_position

async def get_timeline_duration():
    sessions = await MediaManager.request_async()
    current_session = sessions.get_current_session()
    timeline_properties = current_session.get_timeline_properties()
    timeline_duration = str(timeline_properties.end_time.duration)[:-7]
    return timeline_duration

# scrape thumbnail

def scrape_thumb():
    async def read_stream_into_buffer(stream_ref, buffer):
        readable_stream = await stream_ref.open_read_async()
        readable_stream.read_async(buffer, buffer.capacity, InputStreamOptions.READ_AHEAD)

    media = asyncio.run(retrieve())
    thumb_stream_ref = media["thumbnail"]
    thumb_read_buffer = Buffer(5000000)
    asyncio.run(read_stream_into_buffer(thumb_stream_ref, thumb_read_buffer))
    buffer_reader = DataReader.from_buffer(thumb_read_buffer)
    byte_buffer = buffer_reader.read_bytes(thumb_read_buffer.length)
    with open(os.path.dirname(os.path.abspath(__file__)) + "\\media\\album-cover.jpg", "wb+") as fobj:
        fobj.write(bytearray(byte_buffer))

# main

if len(sys.argv) > 1:
    if sys.argv[1] == "artist":
        media = asyncio.run(retrieve())
        sys.stdout.write(media["artist"])
    elif sys.argv[1] == "title":
        media = asyncio.run(retrieve())
        sys.stdout.write(media["title"])
    elif sys.argv[1] == "thumbnail":
        scrape_thumb()
        sys.stdout.write("1")
    elif sys.argv[1] == "toggle":
        current_session = asyncio.run(get_current_session())
        current_session.try_toggle_play_pause_async()
        sys.stdout.write("1")
    elif sys.argv[1] == "skip-back":
        current_session = asyncio.run(get_current_session())
        current_session.try_skip_previous_async()
        sys.stdout.write("1")
    elif sys.argv[1] == "skip-forward":
        current_session = asyncio.run(get_current_session())
        current_session.try_skip_next_async()
        sys.stdout.write("1")
    elif sys.argv[1] == "rewind":
        current_session = asyncio.run(get_current_session())
        current_session.try_rewind_async()
        sys.stdout.write("1")
    elif sys.argv[1] == "position":
        timeline_position = asyncio.run(get_timeline_position())
        sys.stdout.write(timeline_position)
    elif sys.argv[1] == "duration":
        timeline_position = asyncio.run(get_timeline_duration())
        sys.stdout.write(timeline_position)
    elif sys.argv[1] == "summary":
        media = asyncio.run(retrieve())
        media = {song_attr: media[song_attr] for song_attr in media if song_attr != "thumbnail"}
        media["position"] = asyncio.run(get_timeline_position())
        media["duration"] = asyncio.run(get_timeline_duration())
        sys.stdout.write(str(media))
