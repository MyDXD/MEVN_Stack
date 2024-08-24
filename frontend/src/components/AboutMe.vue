<!-- ทำหน้าเว็บแนะนำตัวเอง ชื่อนามสกุล ชื่อเล่น
จบจากมหาลัย สาขา
งานอดิเรก สิ่งที่ชอบ ไม่ชอบ
จุดแข็ง ฟรีดีไซน์ ทีมกีฬาที่ชอบ บลาๆๆ
Ref. https://v2.vuetifyjs.com/en/components/cards/
 -->


<template>
    <div>
        <v-img class="mx-auto mt-10 rounded" height="20%" width="20%" src="img/profile.png" cover></v-img>


        <v-card class="mx-auto text-xs-center mt-5" max-width="20%">
           
            <v-card-title class="text-md-center">
              My Profile
            </v-card-title>

            <v-card-subtitle>
                ชื่อนาม-สกุล : หัสดิน สาโส๊ะ <br>
                ชื่อเล่น : ดิส<br>
                ประวัติการศึกษา : วิทยาลัยเทคนิดหาดใหญ่<br>
                สิ่งที่ชอบ : แมว<br>
                สิ่งที่ไม่ชอบ : สัตว์มีพิษ<br>
                จุดแข็ง : ความพยายาม<br>
                ทีมกีฬาที่ชอบ : -
            </v-card-subtitle>

    
        </v-card>
    </div>
</template>

<script>
export default {

}
</script>

<style></style>