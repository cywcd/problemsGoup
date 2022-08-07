<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span class="card-header-l">
          <span>组织管理</span>
        </span>
      </div>
    </template>
    <div class="form-warp" id="nested">
      <el-form :model="state" ref="formRef" label-width="120px" class="draggable-item">
        <template v-for="(item, index) in state.orgList" :key="item.id">
          <div>
            <el-form-item :prop="'orgList.' + index + '.name'" :rules="formRules.orgName">
              <template #label>
                <span class="flex items-center">
                  <el-icon :size="16">
                    <Rank />
                  </el-icon>
                  <span>组织名称：</span>
                </span>
              </template>
              <el-input v-model="item.name" />
            </el-form-item>
            <el-form-item label="成员">
              <el-table :data="item.members" row-key="id" style="width: 100%">
                <el-table-column label width="60">
                  <el-icon :size="18">
                    <Rank />
                  </el-icon>
                </el-table-column>
                <el-table-column label="姓名：" min-width="120">
                  <template #default="scope">
                    <el-form-item
                      :prop="'orgList.' + index + '.members.' + scope.$index + '.userName'"
                      :rules="formRules.userName"
                    >
                      <el-input v-model="scope.row.userName" class="ignore-elements" placeholder></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄：" min-width="120">
                  <template #default="scope">
                    <el-form-item
                      :prop="'orgList.' + index + '.members.' + scope.$index + '.age'"
                      :rules="formRules.userAge"
                    >
                      <el-input type="number" v-model="scope.row.age" placeholder></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="激活：" min-width="120" align="center">
                  <template #default="scope">
                    <el-checkbox
                      v-model="scope.row.statusCheck"
                      :value="scope.row.status"
                      size="large"
                      @change="statusChange($event, scope.row)"
                    />
                  </template>
                </el-table-column>
                <el-table-column prop="representation" label="管理者：" min-width="120" align="center">
                  <template #default="scope">
                    <el-checkbox
                      v-model="scope.row.managerCheck"
                      :disabled="scope.row.managerDisabled"
                      size="large"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item label>
              <el-row>
                <el-col>
                  <el-button type="primary" icon="Plus" @click="addMemberHandle(index)"></el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-card class="draggable-item" v-for="(sItem, sIndex) in item.children" :key="sIndex">
              <el-form-item
                :prop="'orgList.' + index + '.children.' + sIndex + '.name'"
                :rules="formRules.orgName"
              >
                <template #label>
                  <span class="flex items-center">
                    <el-icon :size="16">
                      <Rank />
                    </el-icon>
                    <span>组织名称：</span>
                  </span>
                </template>
                <el-input v-model="sItem.name" />
              </el-form-item>
              <el-form-item label="成员">
                <el-table :data="sItem.members" row-key="id" style="width: 100%">
                  <el-table-column label width="60">
                    <el-icon :size="18">
                      <Rank />
                    </el-icon>
                  </el-table-column>
                  <el-table-column label="姓名：" min-width="120">
                    <template #default="scope">
                      <el-form-item
                        :prop="'orgList.' + index + '.children.' + sIndex + '.members.' + scope.$index + '.userName'"
                        :rules="formRules.userName"
                      >
                        <el-input v-model="scope.row.userName" placeholder></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="age" label="年龄：" min-width="120">
                    <template #default="scope">
                      <el-form-item
                        :prop="'orgList.' + index + '.children.' + sIndex + '.members.' + scope.$index + '.age'"
                        :rules="formRules.userAge"
                      >
                        <el-input type="number" v-model="scope.row.age" placeholder></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="status" label="激活：" min-width="120" align="center">
                    <template #default="scope">
                      <el-checkbox
                        v-model="scope.row.statusCheck"
                        :value="scope.row.status"
                        size="large"
                        @change="statusChange($event, scope.row)"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="representation"
                    label="管理者："
                    min-width="120"
                    align="center"
                  >
                    <template #default="scope">
                      <el-checkbox
                        v-model="scope.row.managerCheck"
                        :disabled="scope.row.managerDisabled"
                        size="large"
                      />
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              <el-form-item label>
                <el-row>
                  <el-col>
                    <el-button
                      type="primary"
                      icon="Plus"
                      @click="addMemberHandle(index, item.children)"
                    ></el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-divider></el-divider>
            </el-card>
            <el-divider></el-divider>
          </div>
        </template>
        <el-row class="mt-8">
          <el-button type="primary" icon="Plus" @click="addOrgHandle" class="self-start">添加组织</el-button>
        </el-row>
        <div class="mt-8 flex justify-end">
          <el-button @click="cancleHandle" size="large">取消</el-button>
          <el-button type="primary" @click="onSubmit(formRef)" size="large">保存</el-button>
        </div>
      </el-form>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, nextTick, toRefs } from "vue";
import Sortable from "sortablejs";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { orgSubmit } from "@/api/api";
import { analyze } from "eslint-scope";

interface membersItem {
  userName: string;
  readonly id: string;
  age: number | null;
  status: string;
  statusCheck?: unknown;
  managerCheck?: unknown;
  managerDisabled?: boolean;
}

interface orgListType {
  name: string;
  readonly id: string;
  type: string;
  parent: string | null;
  representation: string;
  members: Array<membersItem>;
  children?: any;
}

interface orgArrType {
  name: string;
  readonly id: string;
  type: string;
  parent: string | null;
  representation: string;
  members: string[];
}

let orgList: Array<orgListType> = [
  {
    name: "公司-1",
    id: "org-1",
    type: "organization",
    parent: null,
    representation: "member-1",
    members: [
      {
        userName: "member-1",
        id: "member-1",
        age: 29,
        status: "activated",
        statusCheck: ref(true),
        managerCheck: ref(true),
      },
      {
        userName: "member-2",
        id: "member-2",
        age: null,
        status: "inactivated",
        managerDisabled: true,
      },
    ],
    children: [
      {
        name: "部门-2",
        id: "org-2",
        type: "organization",
        parent: null,
        representation: "member-3",
        members: [
          {
            userName: "member-3",
            id: "member-3",
            age: 28,
            status: "activated",
            statusCheck: ref(true),
            managerCheck: ref(true),
          },
        ],
      },
    ],
  },
];

const formRef = ref<FormInstance>();
const reg1 = /^[a-zA-Z0-9\-\u4e00-\u9fa5]+$/im;
const validateOrgName = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("组织名称不能为空"));
  } else {
    if (!reg1.test(value)) {
      callback(new Error("组织名称只能包含汉字、字母、数字、中线"));
    }
    callback();
  }
};

const validateUserName = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("成员姓名不能为空"));
  } else {
    if (value.length > 8) {
      callback(new Error("成员姓名长度不超过8个字符"));
    }
    callback();
  }
};

const formRules = reactive({
  orgName: [
    { required: true, message: "组织名称不能为空", trigger: "blur" },
    { validator: validateOrgName, trigger: "change" },
  ],
  userName: [
    { required: true, message: "成员姓名不能为空", trigger: "blur" },
    { validator: validateUserName, trigger: "change" },
  ],
  userAge: [{ required: true, message: "成员年龄不能为空", trigger: "blur" }],
});

const orgArr: Array<orgListType> = JSON.parse(JSON.stringify(orgList));

onMounted(async () => {
  await nextTick(() => {
    rowDrop();
    formDrop();
  });
});

// do not use same name with ref
const state = reactive({
  orgList,
});

const addOrgHandle = async () => {
  const timestamp: number = new Date().getTime();
  const orgName: string = `公司-${timestamp}`;
  const orgId: string = `org-${timestamp}`;
  const memberId: string = `member-${timestamp}`;
  const memberItem: membersItem = {
    userName: "",
    id: memberId,
    age: null,
    status: "",
    managerDisabled: true,
    statusCheck: ref(false),
  };
  const itemObj: orgListType = {
    name: orgName,
    id: orgId,
    type: "inactivated",
    parent: null,
    representation: "",
    members: [memberItem],
  };
  state.orgList.push(itemObj);
  await nextTick(() => {
    rowDrop();
    formDrop();
  });
  console.log(state, "add");
};

const addMemberHandle = (i: number, childData?: any) => {
  const timestamp: number = new Date().getTime();
  const memberId: string = `member-${timestamp}`;
  const itemObj: membersItem = {
    userName: "",
    id: memberId,
    age: null,
    status: "inactivated",
    managerDisabled: true,
  };
  if (childData) {
    childData[i].members.push(JSON.parse(JSON.stringify(orgArr)));
  } else {
    state.orgList[i].members.push(itemObj);
  }
};

const statusChange = (val: boolean, row: membersItem) => {
  if (val) {
    row.status = "activated";
    row.managerDisabled = false;
  } else {
    row.status = "inactivated";
    row.managerDisabled = true;
    row.managerCheck = ref(false);
  }
};

const rowDrop = () => {
  const tbodySortables = [].slice.call(
    document.querySelectorAll(".el-table__body-wrapper tbody")
  );

  for (let i = 0; i < tbodySortables.length; i++) {
    new Sortable(tbodySortables[i], {
      group: "tbody",
      animation: 150,
    });
  }
};

const formDrop = () => {
  const nestedSortables = [].slice.call(
    document.querySelectorAll(".draggable-item")
  );

  for (let i = 0; i < nestedSortables.length; i++) {
    new Sortable(nestedSortables[i], {
      group: "nested",
      animation: 150,
      filter: ".ignore-elements",
    });
  }
};

const cancleHandle = () => {
  state.orgList = JSON.parse(JSON.stringify(orgArr));
  console.log("cancleHandle!");
};
const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      submitApi();
    } else {
      ElMessage({
        message: "请完善表单内容",
        grouping: true,
        type: "warning",
      });
      console.log("error submit!");
      return false;
    }
  });
};

// 处理响应数据
let orgslist: object[] = [];
const orgCheck = (arr: object[]) => {
  arr.forEach((item: any) => {
    let { name, id, type, parent, representation, members } = item;
    let memberArr: string[] = [];
    members.forEach((m: any) => {
      memberArr.push(m.id);
    });
    let orgObj = {
      name,
      id,
      type,
      parent,
      representation,
      members: memberArr,
    };
    if (orgslist.every((i: any) => i.id !== id)) {
      orgslist.push(orgObj);
    }
    if (item.children) {
      orgCheck(item.children);
    }
  });
  return orgslist;
};

let membersList: object[] = [];
const memberCheck = (arr: object[]) => {
  arr.forEach((item: any) => {
    let members = item.members || [];
    members.forEach((m: any) => {
      const memberObj = {
        name: m.userName,
        id: m.id,
        age: m.age,
        status:
          m.status && m.status !== "inactivated" ? "activated" : "inactivated",
      };
      if (membersList.every((i: any) => m.id && i.id !== m.id)) {
        membersList.push(memberObj);
      }
    });
    if (item.children) {
      memberCheck(item.children);
    }
  });
  return membersList;
};

const submitApi = () => {
  let orgArr = JSON.parse(JSON.stringify(state.orgList));
  let memberArr = JSON.parse(JSON.stringify(state.orgList));
  console.log(orgCheck(orgArr), "---orgArr");
  console.log(memberCheck(memberArr), "---memberArr");
  const params = {
    orgs: orgCheck(orgArr),
    members: memberCheck(memberArr),
  };
  console.log("提交的数据：", params);
  orgSubmit(params).then((res) => {
    ElMessage({
      message: "提交成功",
      grouping: true,
      type: "success",
    });
    console.log(res, "-submit-result");
  });
};
</script>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-l {
    display: flex;
    justify-items: center;
  }
}
.box-card {
  width: 1024px;
}
.drag-form-item {
  position: relative;
  cursor: move;
  .el-form-item__content {
    .el-icon {
      position: absolute;
      left: -100px;
      z-index: 2;
    }
  }
}
.el-table .el-table__cell {
  ::v-deep .cell {
    overflow: auto;
  }
}
</style>

<style>
.el-table .el-table__cell .cell {
  overflow: auto;
  height: 48px;
}
</style>
