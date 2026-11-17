#!/bin/sh
set -eu

TARGET_DIR="${1:?Buildroot must pass TARGET_DIR}"

mkdir -p \
  "$TARGET_DIR/home/web/.mozilla-profile" \
  "$TARGET_DIR/home/web/.cache" \
  "$TARGET_DIR/run/dbus" \
  "$TARGET_DIR/var/log" \
  "$TARGET_DIR/tmp/.X11-unix"

chmod 0700 "$TARGET_DIR/home/web" "$TARGET_DIR/home/web/.mozilla-profile" "$TARGET_DIR/home/web/.cache"
chmod 1777 "$TARGET_DIR/tmp"

# The overlay and Mozilla tarball are copied before this script runs.
# Keep startup scripts executable in the generated target filesystem.
chmod 0755 "$TARGET_DIR/etc/init.d/S99win11"
chmod 0755 "$TARGET_DIR/opt/gecko/firefox"

# Firefox is started as the unprivileged "web" account created by users.txt.
