<template>
  <div class="useranalysis">
    <h1>“我行我show”</h1>
    <div id="car" class="car">
      <p v-for="item in words">
        {{item}}
      </p>
    </div>
    <h1>互联网汽车行驶报告</h1>
    <div id="pipe" class="pipe"></div>  
    <div id="bar1" class="bar1"></div> 
    <div id="bar2" class="bar2"></div>
    <div id="circle" class="circle"></div>      
    <div class="footer">
      <div class="line left"></div>
      <div class="line right"></div>
      <p>你这样开车堪比女司机！</p>
      <p>难道你就是女司机？</p>
      <button @click="toPage('/prizes')">朕知道了</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import utils from '@/utils'
import echarts from 'echarts'
import wordcloud from 'echarts-wordcloud'
import carPng from '../../assets/images/car.png'
console.log(carPng)
console.log(wordcloud)
export default {
  name: 'userAnalysis',
  data: function () {
    let newTextStyle = {
      verticalAlign: 'bottom',
      align: 'center',
      color: '#56dec4',
      fontSize: 12
    }
    let { totalMileage, avgMileage, kmYouhao, kmAvgYouhao, driveTotalTime, driveAvgTime,
    kmSpeedupCn, kmSpeedupAvgCn, kmBrakesCn, kmBrakesAvgCn, kmTurnCn, kmTurnAvgCn, kmSpeedAvgCn, kmSpeedCn,
    slowTotalTime, slowAvgTime, fatigueTotalTime, fatigueAvgTime,
    earlyTotalTime, lateTotalTime, nightTotalTime, normalTotalTime,
    earlyAvgTime, lateAvgTime, nightAvgTime, normalAvgTime,
    driveLabel, brakesLabel, earlyLabel, fatigueLabel, youhaoLabel, normalLabel,
    nightLabel, speedLabel, remark, speedupLabel, slowLabel, mileageLabel, turnLabel, lateLabel } = this.$store.state.useranalysis.Data
    return {
      words: [
        driveLabel,
        brakesLabel,
        youhaoLabel,
        earlyLabel,
        nightLabel,
        remark,
        fatigueLabel,
        speedupLabel,
        normalLabel,
        speedLabel,
        slowLabel,
        mileageLabel,
        turnLabel,
        lateLabel
      ],
      a: this,
      pipeOption: {
        backgroundColor: '#2F333E',
        title: [
          {
            text: '累计行驶里程',
            bottom: 0,
            left: '6%',
            textStyle: {
              verticalAlign: 'bottom',
              align: 'center',
              color: '#56dec4',
              fontSize: 12
            }
          },
          {
            text: '百公里平均油耗',
            bottom: 0,
            left: 'center',
            textStyle: {
              verticalAlign: 'bottom',
              align: 'center',
              color: '#56dec4',
              fontSize: 12
            }
          },
          {
            text: '驾驶总时长',
            bottom: 0,
            left: '70%',
            textStyle: {
              verticalAlign: 'bottom',
              align: 'center',
              color: '#56dec4',
              fontSize: 12
            }
          }
        ],
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          orient: 'vertical',
          left: 'left',
          data: ['我', '大家的平均值'],
          textStyle: {
            color: '#56dec4',
            fontSize: 12
          }
        },
        series: [
          {
            name: '累计行驶里程',
            type: 'pie',
            radius: '45%',
            label: {
              normal: {
                position: 'inside',
                formatter: function (obj) {
                  return obj.value + 'km'
                }
              }
            },
            center: ['20%', '60%'],
            data: [
              { value: totalMileage, name: '我' },
              { value: avgMileage, name: '大家的平均值' }
            ],
            itemStyle: {
            }
          },
          {
            name: '百公里平均油耗',
            type: 'pie',
            radius: '45%',
            label: {
              normal: {
                position: 'inside',
                formatter: function (obj) {
                  return obj.value + 'L'
                }
              }
            },
            center: ['50%', '60%'],
            data: [
              { value: kmYouhao, name: '我' },
              { value: kmAvgYouhao, name: '大家的平均值' }
            ],
            itemStyle: {
            }
          },
          {
            name: '累计行驶里程',
            type: 'pie',
            radius: '45%',
            label: {
              normal: {
                position: 'inside',
                formatter: function (obj) {
                  return obj.value + 'h'
                }
              }
            },
            center: ['80%', '60%'],
            data: [
              { value: driveTotalTime, name: '我' },
              { value: driveAvgTime, name: '大家的平均值' }
            ],
            itemStyle: {
            }
          }
        ],
        color: ['#FD8D27', '#3C77E6']
      },
      bar1Option: {
        backgroundColor: '#2F333E',
        title: [
          {
            text: '总急加速(次)',
            bottom: 20,
            left: '10%',
            textStyle: newTextStyle
          },
          {
            text: '总急刹车(次)',
            bottom: 20,
            left: 'center',
            textStyle: newTextStyle
          },
          {
            text: '总急转弯(次)',
            bottom: 20,
            left: '65%',
            textStyle: newTextStyle
          }
        ],
        color: ['#FD8D27', '#3C77E6'],
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          orient: 'vertical',
          left: 'left',
          data: ['我', '大家的平均值'],
          textStyle: {
            color: '#56dec4',
            fontSize: 12
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {show: false},
            data: [],
            show: false
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: false
          }
        ],
        series: [
          {
            name: '我',
            type: 'bar',
            barGap: 0.5,
            barCategoryGap: 40,
            center: ['20%', '80%'],
            label: {
              normal: {
                show: true,
                position: 'outside'
              }
            },
            data: [kmSpeedupCn, kmBrakesCn, kmTurnCn]
          },
          {
            name: '大家的平均值',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'outside'
              }
            },
            data: [kmSpeedupAvgCn, kmBrakesAvgCn, kmTurnAvgCn]
          }
        ]
      },
      bar2Option: {
        backgroundColor: '#2F333E',
        title: [
          {
            text: '总超速(次)',
            bottom: 20,
            left: '10%',
            textStyle: {
              verticalAlign: 'bottom',
              align: 'center',
              color: '#56dec4',
              fontSize: 12
            }
          },
          {
            text: '低速驾驶(h)',
            bottom: 20,
            left: 'center',
            textStyle: {
              verticalAlign: 'bottom',
              align: 'center',
              color: '#56dec4',
              fontSize: 12
            }
          },
          {
            text: '疲劳驾驶(h)',
            bottom: 20,
            left: '65%',
            textStyle: {
              verticalAlign: 'bottom',
              align: 'center',
              color: '#56dec4',
              fontSize: 12
            }
          }
        ],
        color: ['#FD8D27', '#3C77E6'],
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          orient: 'vertical',
          left: 'left',
          data: ['我', '大家的平均值'],
          textStyle: {
            color: '#56dec4',
            fontSize: 12
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {show: false},
            data: [],
            show: false
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: false
          }
        ],
        series: [
          {
            name: '我',
            type: 'bar',
            barGap: 0.5,
            barCategoryGap: 40,
            label: {
              normal: {
                show: true,
                position: 'outside'
              }
            },
            data: [kmSpeedCn, slowTotalTime, fatigueTotalTime]
          },
          {
            name: '大家的平均值',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'outside'
              }
            },
            data: [kmSpeedAvgCn, slowAvgTime, fatigueAvgTime]
          }
        ]
      },
      circleOption: {
        backgroundColor: '#2F333E',
        title: [
          {
            text: '我',
            bottom: 10,
            left: '36%',
            textStyle: newTextStyle
          },
          {
            text: '大家的平均值(次)',
            bottom: 10,
            left: '65%',
            textStyle: newTextStyle
          }
        ],
        color: ['#D83B44', '#EA9B25', '#20C8D1', '#66AB2E'],
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: '#56dec4',
            fontSize: 10,
            height: 12
          },
          padding: 0,
          height: 80,
          orient: 'vertical',
          x: 'left',
          data: ['早高峰驾驶时长', '晚高峰驾驶时长', '深夜驾驶时长', '正常驾驶时长']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],
            center: ['40%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'inner',
                fontSize: 10,
                formatter: function (obj) {
                  return obj.value + 'h'
                }
              }
            },
            data: [
                {value: earlyTotalTime, name: '早高峰驾驶时长'},
                {value: lateTotalTime, name: '晚高峰驾驶时长'},
                {value: nightTotalTime, name: '深夜驾驶时长'},
                {value: normalTotalTime, name: '正常驾驶时长'}
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],
            center: ['78%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'inner',
                fontSize: 10,
                formatter: function (obj) {
                  return obj.value + 'h'
                }
              }
            },
            data: [
                {value: earlyAvgTime, name: '早高峰驾驶时长'},
                {value: lateAvgTime, name: '晚高峰驾驶时长'},
                {value: nightAvgTime, name: '深夜驾驶时长'},
                {value: normalAvgTime, name: '正常驾驶时长'}
            ]
          }
        ]
      }
    }
  },
  methods: {
    toPage (url) {
      this.$router.push({path: url})
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  components: {
  },
  mounted() {
    var pipeChart = echarts.init(document.getElementById('pipe'))
    pipeChart.setOption(this.pipeOption)
    var bar1Chart = echarts.init(document.getElementById('bar1'))
    bar1Chart.setOption(this.bar1Option)
    var bar2Chart = echarts.init(document.getElementById('bar2'))
    bar2Chart.setOption(this.bar2Option)
    var circleChart = echarts.init(document.getElementById('circle'))
    circleChart.setOption(this.circleOption)
  },
  beforeMount() {
    utils.setDocTitle('安驾减现金 路遥知“马力”')
  }
}
</script>

<style lang="scss">
  .useranalysis {
    h1 {
      color: #56dec4;
      padding: 20px;
      text-align: center;
      font-size: 22px;
    }
    background-color: #1D2333;
    .pipe, .bar1, .bar2, .circle, .car {
      width: 94%;
      height: 200px;
      margin: 10px auto;
      border-radius: 5px;
      padding: 8px;
    }
    .car {
      overflow: hidden;
      padding: 0;
      margin: 0 auto;
      height: 150px;
      background: url("../../assets/images/car.png");
      background-size: 100% 100%;
      position: relative;
      p {
        position: absolute;
        color: #28B1F9;
        bottom: 38px;
      }
      p:nth-of-type(1) {
        left: 100px;
        font-size: 21px;
        width: 70%;
      }
      p:nth-of-type(2) {
        color: #6163D2;
        left: 21px;
        font-size: 14px;
        bottom: 60px;
      }
      p:nth-of-type(3) {
        left: 10px;
        font-size: 12px;
        color: #C49732;
        top: 54px;
        width: 10px;
        left: 82px;

      }
      p:nth-of-type(4) {
        left: 100px;
        font-size: 21px;
        top: 45px;
        width: 70%;
        color: #58DEC5;
      }
      p:nth-of-type(5) {
        color: red;
        left: 63px;
        width: 10px;
        bottom: 7px;
        font-size: 12px;
      }
      p:nth-of-type(6) {
        bottom: 36px;
        left: 9px;
        font-size: 12px;
        color: #848287;
      }
      p:nth-of-type(7) {
        top: 23px;
        left: 40%;
        font-size: 17px;
        width: 44%;
        color: #F28FAE;
      }
      p:nth-of-type(8) {
        font-size: 1rem;
        width: 70%;
        color: #28B3F8;
        left: 75%;
        top: 32px;
      }
      p:nth-of-type(9) {
        font-size: 14px;
        width: 70%;
        color: #848287;
        left: 80%;
        top: 90px;
      }
      p:nth-of-type(10) {
        font-size: 1.2rem;
        width: 70%;
        color: red;
        left: 78%;
        top: 70px;
      }
      p:nth-of-type(11) {
        left: 80%;
        width: 10px;
        bottom: 9px;
        font-size: 1.2rem;
        color: #F28FAE;
      }
      p:nth-of-type(12) {
        left: 30%;
        top: 71px;
        bottom: 9px;
        color: #848287;
      }
      p:nth-of-type(13) {
        left: 53%;
        top: 5px;
        bottom: 9px;
        color: #C49732;
      }
      p:nth-of-type(14) {
        left: 50%;
        top: 71px;
        bottom: 9px;
        color: #6163D2;
      }
    }
    .footer {
      text-align: center;
      position: relative;
      .line {
        width: 30%;
        height: 1px;
        position: absolute;
        top: 41px;
      }
      .left {
        background: linear-gradient(to left, #ECA553, #1D2333);
      }
      .right {
        left: 248px;
        background: linear-gradient(to right, #ECA553, #1D2333);
      }
      .right-line {
        width: 30%;
        height: 1px;
        background: linear-gradient(to left, #ECA553, #1D2333);
        position: absolute;
        top: 41px;
      }
      p {
        padding: 12px;
        color: #ECA553;
      }
      button {
        text-decoration: none;
        background: #1D2333;
        cursor: pointer;
        border: #54DBCA solid 1px;
        color: #54DBCA;
        width: 150px;
        padding: 5px;
        border-radius: 5px;
        margin: 40px auto;
        font-size: 16px;
        outline: none;
      }
    }
  } 
</style>

