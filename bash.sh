#!/bin/bash
curl https://soundcloud.com/arpjoker-82/likes | sed -n '/<section>/,/<\/section>/p'| grep url | awk 'BEGIN{FS="href"}{print $2}' | awk 'BEGIN{FS="\""}{print "https://soundcloud.com"$2}' > curl.html

#awk '/itemprop/ { print NR }' last.html > line.txt
#i=`wc -l line.txt | cut -b 1`
#printf -v i '%d\n' "$i" 2>/dev/null
#o=1
#for n in {1..$i};do
#	a=`cut -f ` 
#	sed -n ''$a'p' last.html > line.html
#		echo $o
#	o=$((o+1))
#
#done
