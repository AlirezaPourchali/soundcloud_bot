import time
from selenium import webdriver
from bs4 import BeautifulSoup
from urllib.parse import urljoin
driver = webdriver.Chrome()
driver.get("https://soundcloud.com/arpjoker-82/likes")
time.sleep(2)  # Allow 2 seconds for the web page to open
scroll_pause_time = 1
screen_height = driver.execute_script("return window.screen.height;")   # height
i = 1
while True:
    driver.execute_script("window.scrollTo(0, {screen_height}*{i});".format(screen_height=screen_height, i=i))  
    i += 1
    time.sleep(scroll_pause_time)
    # update scroll height each time after scrolled, as the scroll height can change after we scrolled the page
    scroll_height = driver.execute_script("return document.body.scrollHeight;")  
    # Break the loop when the height we need to scroll to is larger than the total scroll height
    if (screen_height) * i > scroll_height:
        html = driver.page_source
        time.sleep(2)
        print(html)
        break 

