<template>
  <div class="container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <slot name="header"></slot>
        </div>
      </template>
      <el-table
        :data="listData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-bind="childrenProps"
      >
        <el-table-column
          v-if="showSelectColumn"
          type="selection"
          align="center"
          width="60"
        ></el-table-column>
        <el-table-column
          v-if="showIndexColumn"
          type="index"
          label="序号"
          align="center"
          width="80"
        ></el-table-column>
        <template v-for="propItem in propList" :key="propItem.prop">
          <el-table-column
            v-bind="propItem"
            align="center"
            show-overflow-tooltip
          >
            <template #default="scope">
              <slot :name="propItem.slotName" :row="scope.row">
                {{ scope.row[propItem.prop] }}
              </slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <div class="footer" v-if="showFooter">
        <slot name="footer">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :page-sizes="[10, 20, 30]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listCount"
          >
          </el-pagination>
        </slot>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
//
import { defineProps, defineEmits, defineExpose, ref } from 'vue'
const props = defineProps({
  listData: {
    type: Array,
    required: true
  },
  childrenProps: {
    type: Object,
    default: () => ({})
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  showSelectColumn: {
    type: Boolean,
    default: false
  },
  showIndexColumn: {
    type: Boolean,
    default: false
  },
  listCount: {
    type: Number,
    default: 0
  },
  propList: {
    type: Array,
    required: true
  },
  page: {
    type: Object,
    default: () => ({ currentPage: 0, pageSize: 10 })
  }
})

const emit = defineEmits([
  'selectionChange',
  'newBtnClick',
  'editBtnClick',
  'update:page'
])
const isUpdate = ref(true)
const isDelete = ref(true)
const handleSelectionChange = (value: any) => {
  emit('selectionChange', value)
}

const handleNewClick = () => {
  emit('newBtnClick')
}
const handleEditClick = (item: any) => {
  emit('editBtnClick', item)
}

const handleDeleteClick = (item: any) => {
  console.log(item)
}

const handleCurrentChange = (currentPage: number) => {
  emit('update:page', { ...props.page, currentPage })
}

const handleSizeChange = (pageSize: number) => {
  emit('update:page', { ...props.page, pageSize })
}

defineExpose({
  handleNewClick,
  handleEditClick,
  handleDeleteClick,
  handleCurrentChange,
  handleSizeChange
})
</script>

<style lang="less" scoped>
//@import url()
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
