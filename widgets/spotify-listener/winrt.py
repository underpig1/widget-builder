# https://stackoverflow.com/questions/65011660/how-can-i-get-the-title-of-the-currently-playing-media-in-windows-10-with-python

import asyncio

from winrt.windows.media.control import \
    GlobalSystemMediaTransportControlsSessionManager as MediaManager


async def get_media_info():
    sessions = await MediaManager.request_async()
    current_session = sessions.get_current_session()
    if current_session:
        info = await current_session.try_get_media_properties_async()
        info_dir = {song_attr: info.__getattribute__(song_attr) for song_attr in dir(info) if song_attr[0] != '_'}
        return info_dir

current_media_info = asyncio.run(get_media_info())
print(current_media_info)

# scrape thumbnail

from winrt.windows.storage.streams import \
    DataReader, Buffer, InputStreamOptions

async def read_stream_into_buffer(stream_ref, buffer):
    readable_stream = await stream_ref.open_read_async()
    readable_stream.read_async(buffer, buffer.capacity, InputStreamOptions.READ_AHEAD)

thumb_stream_ref = current_media_info["thumbnail"]

thumb_read_buffer = Buffer(5000000)

asyncio.run(read_stream_into_buffer(thumb_stream_ref, thumb_read_buffer))

buffer_reader = DataReader.from_buffer(thumb_read_buffer)
byte_buffer = buffer_reader.read_bytes(thumb_read_buffer.length)

with open("media_thumb.jpg", "wb+") as fobj:
    fobj.write(bytearray(byte_buffer))
