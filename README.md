PromptPay QR Generator
เขียนด้วย React 19, Vite และตกแต่งหน้าตาด้วย Tailwind CSS โดยใช้ไลบรารี promptparse ในการเจนค่าตามมาตรฐาน EMVCo
Link สำหรับ Preview:
Features
รองรับทั้งเบอร์มือถือและเลขบัตรประชาชน
ใส่จำนวนเงินได้: จะใส่ยอดเงินที่ต้องการระบุ หรือจะปล่อยว่างไว้เพื่อให้คนโอนกรอกเงินเองตอนสแกนก็ได้
ข้อมูลตอนพรีวิว: เมื่อกดปุ่มสร้าง QR Code แสดงหน้าต่างป๊อปอัปแสดง QR Code เพื่อป้องกันการแก้ไขหมายเลขพร้อมเพย์กับ QR Code ไม่ตรงกัน
ปุ่มดาวน์โหลดรูปภาพ: แปลง QR Code เป็นรูปภาพ .png
Libraries Used
promptparse: ใช้แปลงเบอร์และจำนวนเงินเป็นข้อความ Payload ตามมาตรฐานพร้อมเพย์
qrcode.react: ใช้แปลงข้อความที่ได้จาก promptparse มาวาดเป็นภาพ QR Code บน Canvas และช่วยให้ระบบสามารถสั่งเซฟไฟล์ดาวน์โหลดเป็นรูปภาพได้
Tailwind CSS v3: ใช้แต่งหน้าตาเว็บให้ดูสวยงาม
วิธีการเปิดใช้งานโปรเจกต์ (How to Run)

1. โคลนโปรเจกต์ลงเครื่อง (Clone Project)
   git clone https://github.com/your-username/qr-promptpay.git
   cd qr-promptpay

2. ติดตั้งเครื่องมือที่จำเป็น (Install Dependencies)
   ติดตั้งไลบรารีทั้งหมดที่ระบบต้องใช้:
   npm install

3. รันโปรเจกต์ (Start Development Server)
   รันคำสั่งนี้เพื่อเปิดเว็บในโหมดพัฒนา (Development Mode):
   npm run dev
