#!/bin/bash
#cat finaly.html `#curl https://soundcloud.com/arpjoker-82/likes` | sed -n '/<section>/,/<\/section>/p'| grep url | awk 'BEGIN{FS="href"}{print $2}' | awk 'BEGIN{FS="\""}{print "https://soundcloud.com"$2}' > curl.html
#a=`curl "https://soundcloud.com/arpjoker-82" | grep "users:" |awk 'BEGIN{FS="users:"}{print $2}' | awk 'BEGIN{FS="\""}{print $1}' | head -n 1`
#curl "https://api-v2.soundcloud.com/users/$a/likes?offset=2022-11-06T12:10:49.688Z,user-track-likes,000-00000000000672890192-00000000000586488615&client_id=M1st288RpSGenY314AaaHwddXSnfh1Xw&limit=62"| awk 'BEGIN{RS="permalink_url" ; FS="\""} { print $3 }' > curl5.html

 | grep draggable | awk 'BEGIN{FS="\""}{printf NR%2 ? "https://soundcloud.com"$4"\n" : ""}' 

