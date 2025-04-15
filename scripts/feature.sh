#!/bin/bash

if [ $# -eq 0 ]
then
    echo "Usage: feature <FeatureName> [--force]"
    exit    
fi

FEATURE_NAME=$1
FORCE_OVERWRITE=false

if [ $# -gt 1 ] && [ "$2" = "--force" ]; then
    FORCE_OVERWRITE=true
fi

FEATURE_DIR="src/features/$FEATURE_NAME"

if [ -d "$FEATURE_DIR" ]; then
    if [ "$FORCE_OVERWRITE" = true ]; then
        rm -rf "$FEATURE_DIR"
    else
        read -p "Feature '$FEATURE_NAME' already exists. Overwrite? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "Operation cancelled."
            exit 1
        fi
        rm -rf "$FEATURE_DIR"
    fi
fi

mkdir -p "$FEATURE_DIR"
touch "$FEATURE_DIR/index.ts" "$FEATURE_DIR/api.ts" "$FEATURE_DIR/types.ts" "$FEATURE_DIR/internal.ts"

echo "export * from './api';" > "$FEATURE_DIR/index.ts"
echo "export * from './types';" >> "$FEATURE_DIR/index.ts"

echo "Initialized feature $FEATURE_NAME"