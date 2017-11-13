import $ from '@/utils'

export default {
  name: 'orders',
  computed: {
    data () {
      return this.$store.state.Orders.Data
    },
    orders () {
      return this.$store.state.Orders
    }
  },
  methods: {
    toggleTab (tab = '') {
      if (this.orders.isLoading || this.orders.currentTab === tab) return
      this.$store.dispatch('ORDER_TO_TAB', tab)
      this.$router.replace({path: `/orders?tab=${tab}`})
      this.getData(0, tab)
    },
    update (obj) {
      this.$store.commit('orders_update', obj)
    },
    getData (page = 0, status = '', isMore = false) {
      let req = {
        page: page,
        status: status,
        size: 10
      }
      this.update({isLoading: true})
      isMore && this.update({isLoadingMore: isMore})
      $.ajax('POST')('/writeoff-web-api/vouchers/settlement/list', req).then(data => {
        this.$store.commit('orders_update_data', {data: data, isMore: isMore})
        this.update({isLoading: false})
        isMore && this.update({isLoadingMore: !isMore})
      }, () => {
        this.update({isLoading: false})
        isMore && this.update({isLoadingMore: !isMore})
      })
    },
    toScan (id) {
      this.$router.push({path: `/scan?action=reupload&id=${id}`})
    },
    feedBackSubmit (id, data, index) {
      if (!data) {
        $.alert('申诉失败，内容不能为空！', 'error')
        return
      }
      this.update({
        feedBackCache: data,
        isFullScreenLoading: true
      })
      $.ajax('POST')('/writeoff-web-api/vouchers/settlement/appeal', {settlementId: id, content: data}).then(data => {
        $.alert('申诉成功！', 'success')
        this.$store.commit('orders_splice_data', index)
        this.update({
          feedBackCache: '',
          isFullScreenLoading: false
        })
      }, () => {
        this.update({isFullScreenLoading: false})
      })
    },
    feedBack (id, index) {
      window.swal({
        title: '申诉',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确认',
        html: '<textarea id="feedBackContent" placeholder="请输入申诉内容">' + this.orders.feedBackCache + '</textarea>'
      }).then(() => {
        this.feedBackSubmit(id, $.ele('#feedBackContent').value, index)
      }, () => {})
    },
    returnedReason (id) {
      this.update({isFullScreenLoading: true})
      $.ajax('POST')(`/writeoff-web-api/vouchers/settlement/returnReason/${id}`).then(data => {
        this.update({isFullScreenLoading: false})
        window.swal({
          title: '退回原因',
          confirmButtonClass: 'singleBtn',
          confirmButtonText: '确认',
          html: data
        })
      }, () => {
        this.update({isFullScreenLoading: false})
      })
    }
  },
  beforeMount () {
    $.setDocTitle(`订单服务`)
    this.toggleTab(this.$route.query.tab || '')
  },
  mounted () {
    if ($.ele('#orders') && !$.ele('#orders').classList.contains('isAddScrollEvent')) {
      document.onscroll = () => {
        if (!$.ele('#orders')) return
        $.ele('#orders').classList.add('isAddScrollEvent')
        if (!(this.orders.isLoadingMore || this.orders.isLoading || this.data.total === this.data.content.length)) {
          let top = document.documentElement.scrollTop || document.body.scrollTop
          if (top > 0 && top >= document.documentElement.offsetHeight - window.innerHeight - 50) {
            this.getData(this.data.pageNumber + 1, this.orders.currentTab, true)
          }
        }
      }
    }
  },
  destroyed () {}
}
