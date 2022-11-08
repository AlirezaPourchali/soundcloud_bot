#!/bin/bash
curl https://soundcloud.com/soroush-habibi-419430096/likes > curl.html
sed -n '/<section>/,/<\/section>/p' curl.html > last.html
i=`awk '/itemprop/{ print NR } last.html' | wc -l`
awk '/itemprop/ { print NR } last.html' > line.txt
for n in {1..$i};do
	a=`sed -n '$n p' line.txt`
	sed -n '$a p' last.html > line.html
done
