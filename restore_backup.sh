#!/bin/bash

BACKUP_DIR="backup_20250124_102755"

if [ ! -d "$BACKUP_DIR" ]; then
    echo "Fehler: Backup-Ordner $BACKUP_DIR nicht gefunden!"
    exit 1
fi

echo "Stelle Backup wieder her..."
cp -r $BACKUP_DIR/page.tsx src/app/ 2>/dev/null || true
cp -r $BACKUP_DIR/globals.css src/app/ 2>/dev/null || true
cp -r $BACKUP_DIR/* src/app/components/ 2>/dev/null || true

echo "Backup wurde wiederhergestellt!"
