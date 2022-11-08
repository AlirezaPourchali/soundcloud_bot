#!/bin/bash
echo `curl https://soundcloud.com/soroush-habibi-419430096/likes` > last.html

sed -n '/<section>/,/<\/section>/p' last.html > new.html

