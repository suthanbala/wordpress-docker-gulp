#!/bin/bash
current_path="`dirname \"$0\"`"

sh "$current_path/export_db.sh"
sh "$current_path/export_src.sh"