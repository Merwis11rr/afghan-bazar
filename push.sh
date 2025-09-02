#!/bin/bash
# Afghanbazar GitHub Push Script
# نویسنده: Merwis Rahimi (happy-go-21)

# مسیر پروژه (اینجا تغییر بده اگر لازم شد)
PROJECT_DIR="/home/hajimantal/Downloads/afghanbazar/Afghanbazar"

# آدرس ریپازیتوری
REPO_URL="https://github.com/happy-go-21/Afghanbazar.git"

# شاخه اصلی
BRANCH="main"

echo "📂 تغییر مسیر به پروژه..."
cd "$PROJECT_DIR" || { echo "❌ مسیر پروژه یافت نشد!"; exit 1; }

echo "🔍 بررسی remote..."
if git remote -v | grep -q "$REPO_URL"; then
    echo "✅ remote درست است."
else
    echo "⚠️ remote تنظیم نیست یا نادرست است. تنظیم می‌کنم..."
    git remote remove origin 2>/dev/null
    git remote add origin "$REPO_URL"
    echo "✅ remote تنظیم شد."
fi

echo "➕ افزودن تغییرات..."
git add .

echo "📝 نوشتن commit..."
git commit -m "Update: تغییرات جدید در پروژه" || echo "⚠️ هیچ تغییری برای commit وجود ندارد."

echo "🚀 ارسال به GitHub..."
git push origin "$BRANCH"

echo "🎉 تمام شد! تغییرات جدید به $BRANCH در GitHub رفت."
