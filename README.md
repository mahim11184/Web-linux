# Web Linux

**Web Linux** is a small x86_64 live operating system built from upstream Buildroot sources. It boots a Linux kernel, starts Xorg, and opens a local HTML desktop in Mozilla Firefox ESR (Gecko) kiosk mode.

The browser desktop is a web interface, not a copy of Windows or a replacement for a full conventional desktop environment. Its files are kept separate so you can customise the HTML, CSS and JavaScript without changing the Linux build.

## What is included

- Buildroot-based Linux root filesystem and Linux kernel
- Mozilla Firefox ESR downloaded from Mozilla's official Linux distribution
- Xorg with generic VESA/framebuffer fallbacks and libinput
- A dedicated unprivileged `web` account for the kiosk browser
- A local HTML/CSS/JavaScript desktop in `overlay/var/www/win11/`
- GRUB ISO boot support for legacy BIOS and 64-bit UEFI
- GitHub Actions workflow that builds and uploads `Web-Linux.iso`

## Build the ISO on GitHub

1. Open this repository on GitHub.
2. Select **Actions**.
3. Open **Build Web Linux ISO**.
4. Select **Run workflow** and start the build.
5. When the run finishes successfully, open its summary and download the **Web-Linux-ISO** artifact.
6. Extract the artifact ZIP. It contains `Web-Linux.iso` and a SHA-256 checksum.

A build also starts automatically when you push a commit to the `main` branch. The first build downloads Buildroot and Firefox ESR and can take a while.

## Boot it

- Test the ISO first in QEMU or VirtualBox.
- For USB, use Ventoy or a USB imaging tool that supports bootable hybrid/El Torito ISOs.
- The image targets **x86_64 PCs** and includes legacy BIOS plus 64-bit UEFI boot entries.
- The live system uses an initrd, so changes made inside the running session are temporary.

## Customise the desktop

Replace or add your web assets in:

```text
overlay/var/www/win11/
├── index.html
├── style.css
└── app.js
```

The kiosk starts this local file:

```text
file:///var/www/win11/index.html
```

Keep assets local and use relative paths so the desktop works without an internet connection.

## Build design notes

- Buildroot is pinned to its `2026.08.x` stable branch.
- Firefox ESR is fetched from Mozilla's official Linux download endpoint as a `.tar.xz` archive.
- The ISO is produced by Buildroot's ISO9660 image target with GRUB2 and an external initrd.
- The Firefox process runs as the `web` user instead of root.
- The expected ISO size is not fixed: Firefox and its graphics libraries make it larger than a minimal Linux rescue image.

## Current limitations

This is an initial bootable project, not a finished hardware-certified OS. Graphics acceleration varies by PC. The image does not bundle the full proprietary Linux-firmware collection; Wi-Fi adapters that require external firmware may not work until their specific firmware is added. Ethernet is the safest first network option. Test in a virtual machine before writing the ISO to a USB drive, and keep backups of important data.

The GitHub Actions build removes unused preinstalled runner toolchains before compiling and skips the oversized monolithic linux-firmware archive. Previously, that archive exhausted the runner's disk during extraction. No individual firmware families were selected in the old configuration, so downloading the archive did not provide usable Wi-Fi firmware.

## Main project paths

- `.github/workflows/build-os.yml` — cloud ISO builder
- `board/web-linux/` — GRUB menu, user table and post-build setup
- `overlay/etc/init.d/S99win11` — graphical kiosk startup
- `overlay/var/www/win11/` — web desktop source
