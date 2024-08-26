<!-- ทำหน้าเว็บแนะนำตัวเอง ชื่อนามสกุล ชื่อเล่น
จบจากมหาลัย สาขา
งานอดิเรก สิ่งที่ชอบ ไม่ชอบ
จุดแข็ง ฟรีดีไซน์ ทีมกีฬาที่ชอบ บลาๆๆ
Ref. https://v2.vuetifyjs.com/en/components/cards/
 -->


<template>
    <div>
        <template>
            <v-container style="margin-top: 7rem;">

                <v-row>
                    <!-- Div ฝั่งซ้าย 1 ก้อน -->
                    <v-col width="100%" cols="4">
                        <v-card class="pa-3">
                            <img width="100%" src="img/profile.png" alt="Profile Image">
                        </v-card>
                    </v-col>

                    <!-- Div ฝั่งขวาหลายๆ ก้อน -->
                    <v-col cols="8">
                        <v-row>
                            <v-col cols="12">
                                <v-card class="pa-3">
                                    <b>ประส่วนตัว</b>
                                    <v-text> <br>ชื่อนาม-สกุล : หัสดิน สาโส๊ะ <br>
                                        ชื่อเล่น : ดิส<br>
                                        ที่อยู่ : 107/3 ม.7 อ.บางกล่ำ ต.ท่าช้าง จ.สงขลา
                                    </v-text>
                                </v-card>
                            </v-col>
                            <v-col cols="8">
                                <v-card class="pa-3">
                                    <b>ประวัติการศึกษา</b>
                                    <v-text>
                                        <br>ประกาศนียบัตรวิชาชีพ (ปวช.) : วิทยาลัยเทคนิคหาดใหญ่ สาขา :
                                        เทคโนโลยีสารสนเทศ<br>
                                        ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.) : วิทยาลัยเทคนิคหาดใหญ่ สาขา :
                                        เทคโนโลยีสารสนเทศ<br>
                                        ปริญญาตรี : วิทยาลัยเทคนิคหาดใหญ่ สาขา : เทคโนโลยีสารสนเทศ<br>

                                    </v-text>
                                </v-card>
                            </v-col>
                            <v-col cols="4">
                                <v-card class="pa-3">
                                    <b>งานอดิเรก</b>
                                    <v-text>
                                        <br>
                                        <ul>
                                            <li>ศึกษาหาความรู้ใหม่ๆ</li>
                                            <li>ดูหนัง,ฟังเพลง,เล่นเกม</li>
                                            <li>ออกไปเจอกับโลกภายนอก</li>
                                        </ul>
                                    </v-text>
                                    <v-text>
                                        <b>สิ่งที่ชอบ</b> :
                                        <span class="rainbow-text mb-2">Cat only</span>
                                        <br>
                                        <b>สิ่งที่ไม่ชอบ</b> : สัตว์มีพิษทุกชนิด
                                    </v-text>
                                </v-card>
                            </v-col>
                            <v-col cols="12">
                                <v-card class="pa-3">
                                    <b>My skill</b> : HTML, CSS, Tailwind, Java, Script, React, Nodejs, Express,
                                    MongoDB
                                </v-card>
                            </v-col>
                        </v-row>


                    </v-col>

                </v-row>

            </v-container>
        </template>

    </div>
</template>

<script>
export default {

}
</script>

<style>
.rainbow-text {
  background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
  -webkit-background-clip: text;
  background-clip: text; /* เพิ่มคุณสมบัติแบบมาตรฐาน */
  color: transparent;
}


.jutifly {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>