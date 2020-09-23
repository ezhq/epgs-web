<template>
  <div class="q-pa-sm">
    <q-card class="topListBox">
      <q-card-section class="topList">
        <q-card v-if="books.all.length === 0" class="topItemBox">
          <q-card-section class="topItem">
            <q-btn flat style="width: 100%;height: 100%;" icon="add"
              >There's no book, please add one below.</q-btn
            >
          </q-card-section>
        </q-card>
        <q-card
          v-else
          v-for="book in books.all"
          :key="book.id"
          class="topItemBox"
          @click="bookClicked(book.id)"
        >
          <q-card-section class="topItem">
            <div class="topItemContent">
              <q-img
                :src="book.coverImgUrl"
                spinner-color="white"
                style=""
                class="rounded-borders topItemContentImg"
              >
                <template v-slot:loading>
                  <q-skeleton
                    type="rect"
                    width="120px"
                    height="150px"
                    animation="wave"
                  />
                </template>
              </q-img>
              <div class="topItemContentInfo">
                <div class="text-h5">{{ book.titleChina }}</div>
                <div>{{ book.titleEnglish }}</div>
                <div>{{ book.authorChina }}({{ book.authorEnglish }})</div>
              </div>
            </div>
            <q-linear-progress
              :color="book.done ? 'accent' : 'warning'"
              :value="book.progress.split('/')[0] / book.progress.split('/')[1]"
              :buffer="1"
              rounded
              size="24px"
              stripe
            >
              <div class="absolute-full flex flex-center">
                <q-badge
                  color="white"
                  :text-color="book.done ? 'accent' : 'warning'"
                  :label="book.progress"
                />
              </div>
            </q-linear-progress>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>

    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="bg-grey-3 text-grey-7"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="info" label="Info" />
        <q-tab name="read" label="Read" />
        <q-tab name="add" label="Add Book" />
      </q-tabs>

      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="fade"
        transition-next="fade"
      >
        <q-tab-panel name="info">
          <div class="text-h6">Book info</div>
          Ready to design.
        </q-tab-panel>

        <q-tab-panel name="read">
          <q-card v-if="readBook.cache.addButton" class="q-ma-md">
            <q-card-section>
              <q-btn
                flat
                style="width: 100%;"
                icon="add"
                @click="readBook.cache.recordOpen = !readBook.cache.recordOpen"
              />
            </q-card-section>
          </q-card>
          <q-card v-if="readBook.records.length === 0" class="q-ma-md">
            <q-card-section>
              <p>There's no record now, add one!</p>
              <!-- <p>books.all.length: {{ books.all.length !== 0 }}</p>
              <p>
                books.all.filter(item => item.id ===
                {{ books.nowSelectedBookId }}) .done:
                {{
                  books.all.filter(
                    item => item.id === books.nowSelectedBookId
                  )[0].done === false
                }}
              </p>
              <p>readBook.cache.recordOpen: {{ !readBook.cache.recordOpen }}</p> -->
            </q-card-section>
          </q-card>
          <q-card v-if="readBook.cache.recordOpen === true" class="q-ma-md">
            <q-card-section>
              <q-form
                @submit="addBookRecordSubmit"
                @reset="addBookRecordReset"
                class="q-gutter-md"
              >
                <q-input
                  filled
                  dense
                  hide-bottom-space
                  type="number"
                  v-model.number="readBook.record.data.pageStart"
                  :label="readBook.record.label.pageStart"
                  lazy-rules
                  :rules="readBook.record.rule.pageStart"
                >
                  <template v-slot:prepend>
                    <q-icon
                      :name="readBook.record.icon.pageStart"
                      :color="readBook.record.color.pageStart"
                    />
                  </template>
                </q-input>

                <q-input
                  filled
                  dense
                  hide-bottom-space
                  type="number"
                  v-model.number="readBook.record.data.pageEnd"
                  :label="readBook.record.label.pageEnd"
                  lazy-rules
                  :rules="readBook.record.rule.pageEnd"
                >
                  <template v-slot:prepend>
                    <q-icon
                      :name="readBook.record.icon.pageEnd"
                      :color="readBook.record.color.pageEnd"
                    />
                  </template>
                </q-input>

                <q-input
                  filled
                  dense
                  v-model="readBook.record.data.timeStart"
                  :label="readBook.record.label.timeStart"
                >
                  <template v-slot:prepend>
                    <q-icon
                      :name="readBook.record.icon.timeStart"
                      :color="readBook.record.color.timeStart"
                      class="cursor-pointer"
                    >
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="readBook.record.data.timeStart"
                          mask="YYYYMMDDHHmmss"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon
                      name="access_time"
                      :color="readBook.record.color.timeStart"
                      class="cursor-pointer"
                    >
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="readBook.record.data.timeStart"
                          mask="YYYYMMDDHHmmss"
                          format24h
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <q-input
                  filled
                  dense
                  v-model="readBook.record.data.timeEnd"
                  :label="readBook.record.label.timeEnd"
                >
                  <template v-slot:prepend>
                    <q-icon
                      :name="readBook.record.icon.timeEnd"
                      :color="readBook.record.color.timeEnd"
                      class="cursor-pointer"
                    >
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="readBook.record.data.timeEnd"
                          mask="YYYYMMDDHHmmss"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon
                      name="access_time"
                      :color="readBook.record.color.timeEnd"
                      class="cursor-pointer"
                    >
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="readBook.record.data.timeEnd"
                          mask="YYYYMMDDHHmmss"
                          format24h
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <q-input
                  filled
                  dense
                  v-model="readBook.record.data.note"
                  autogrow
                  :label="readBook.record.label.note"
                >
                  <template v-slot:prepend>
                    <q-icon :name="readBook.record.icon.note" />
                  </template>
                </q-input>

                <div>
                  <q-btn
                    label="Submit"
                    type="submit"
                    color="primary"
                    :loading="addBook.cache.submit"
                  >
                    <template v-slot:loading>
                      <q-spinner-facebook />
                    </template>
                  </q-btn>
                  <q-btn
                    label="Cancel"
                    type="reset"
                    color="primary"
                    flat
                    class="q-ml-sm"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
          <q-card
            v-for="record in readBook.records"
            :key="record.id"
            class="q-ma-md"
          >
            <q-card-section
              class="full-width row no-wrap justify-between items-center content-start"
            >
              <div
                class="row no-wrap justify-start items-center content-start rounded-borders bg-primary"
              >
                <div
                  class="text-h4  rounded-borders bg-accent q-pa-xs text-white"
                >
                  {{ record.info.pageEnd - record.info.pageStart }}
                </div>
                <div class="text-h6  q-pa-xs text-accent">
                  {{ record.info.pageStart }} - {{ record.info.pageEnd }}
                </div>
              </div>
              <div class="text-subtitle2 text-weight-thin">
                {{ record.info.timeStart }} - {{ record.info.timeEnd }}
              </div>
            </q-card-section>

            <q-separator inset="true" />

            <q-card-section class="q-pt-none">
              {{ record.info.note }}
            </q-card-section>
          </q-card>
        </q-tab-panel>

        <q-tab-panel
          name="add"
          class="q-pa-lg"
          style="max-width: 60%;margin: 0 auto;"
        >
          <q-form
            @submit="addBookSubmit"
            @reset="addBookSubmitReset"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="addBook.data.titleChina"
              :label="addBook.label.titleChina"
              :hint="addBook.hint.titleChina"
              lazy-rules
              :rules="addBook.rule.titleChina"
            >
              <template v-slot:prepend>
                <q-icon
                  :name="addBook.icon.titleChina"
                  :color="addBook.color.titleChina"
                />
              </template>
            </q-input>

            <q-input
              filled
              v-model="addBook.data.titleEnglish"
              :label="addBook.label.titleEnglish"
              :hint="addBook.hint.titleEnglish"
              lazy-rules
              :rules="addBook.rule.titleEnglish"
            >
              <template v-slot:prepend>
                <q-icon
                  :name="addBook.icon.titleEnglish"
                  :color="addBook.color.titleEnglish"
                />
              </template>
            </q-input>

            <q-input
              filled
              v-model="addBook.data.authorChina"
              :label="addBook.label.authorChina"
              :hint="addBook.hint.authorChina"
              lazy-rules
              :rules="addBook.rule.authorChina"
            >
              <template v-slot:prepend>
                <q-icon
                  :name="addBook.icon.authorChina"
                  :color="addBook.color.authorChina"
                />
              </template>
            </q-input>

            <q-input
              filled
              v-model="addBook.data.authorEnglish"
              :label="addBook.label.authorEnglish"
              :hint="addBook.hint.authorEnglish"
              lazy-rules
              :rules="addBook.rule.authorEnglish"
            >
              <template v-slot:prepend>
                <q-icon
                  :name="addBook.icon.authorEnglish"
                  :color="addBook.color.authorEnglish"
                />
              </template>
            </q-input>

            <q-input
              filled
              v-model="addBook.data.coverImgUrl"
              :label="addBook.label.coverImgUrl"
              :hint="addBook.hint.coverImgUrl"
              lazy-rules
              :rules="addBook.rule.coverImgUrl"
            >
              <template v-slot:prepend>
                <q-icon
                  :name="addBook.icon.coverImgUrl"
                  :color="addBook.color.coverImgUrl"
                />
              </template>
            </q-input>

            <q-input
              filled
              v-model="addBook.data.isbn"
              :label="addBook.label.isbn"
              :hint="addBook.hint.isbn"
              lazy-rules
              :rules="addBook.rule.isbn"
            >
              <template v-slot:prepend>
                <q-icon :name="addBook.icon.isbn" :color="addBook.color.isbn" />
              </template>
            </q-input>

            <q-input
              filled
              v-model="addBook.data.press"
              :label="addBook.label.press"
              :hint="addBook.hint.press"
              lazy-rules
              :rules="addBook.rule.press"
            >
              <template v-slot:prepend>
                <q-icon
                  :name="addBook.icon.press"
                  :color="addBook.color.press"
                />
              </template>
            </q-input>

            <q-input
              filled
              type="number"
              v-model.number="addBook.data.progress"
              :label="addBook.label.progress"
              :hint="addBook.hint.progress"
              lazy-rules
              :rules="addBook.rule.progress"
            >
              <template v-slot:prepend>
                <q-icon
                  :name="addBook.icon.progress"
                  :color="addBook.color.progress"
                />
              </template>
            </q-input>

            <div>
              <q-btn
                label="Submit"
                type="submit"
                color="primary"
                :loading="addBook.cache.submit"
              >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
              <q-btn
                label="Clear"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import {
  getListAll,
  addBook,
  getRecordById,
  addBookReadRecord
} from "src/services/lib";

export default {
  name: "index",

  data: function() {
    return {
      books: {
        all: [],
        nowSelectedBookId: 0
      },
      tab: `read`,
      addBook: {
        cache: {
          submit: false
        },
        icon: {
          titleChina: `book`,
          titleEnglish: `book`,
          authorChina: `person`,
          authorEnglish: `person`,
          coverImgUrl: `image`,
          isbn: `qr_code`,
          press: `domain`,
          progress: `subject`
        },
        color: {
          titleChina: `primary`,
          titleEnglish: `primary`,
          authorChina: `primary`,
          authorEnglish: `primary`,
          coverImgUrl: ``,
          isbn: ``,
          press: `primary`,
          progress: `primary`
        },
        label: {
          titleChina: `Chinese name`,
          titleEnglish: `English name`,
          authorChina: `Author CN`,
          authorEnglish: `Author EN`,
          coverImgUrl: `Cover URL`,
          isbn: `ISBN`,
          press: `Press`,
          progress: `Pages`
        },
        hint: {
          titleChina: ``,
          titleEnglish: ``,
          authorChina: ``,
          authorEnglish: ``,
          coverImgUrl: ``,
          isbn: ``,
          press: ``,
          progress: ``
        },
        rule: {
          titleChina: [
            val =>
              (val && val.length > 0) || `Please inter the book's chinese name.`
          ],
          titleEnglish: [
            val =>
              (val && val.length > 0) || `Please inter the book's english name.`
          ],
          authorChina: [
            val =>
              (val && val.length > 0) ||
              `Please inter the author's english name.`
          ],
          authorEnglish: [
            val =>
              (val && val.length > 0) ||
              `Please inter the author's english name.`
          ],
          coverImgUrl: [],
          isbn: [],
          press: [
            val =>
              (val && val.length > 0) ||
              `Please inter the book's publisher's name.`
          ],
          progress: [
            val =>
              (val && typeof val === "number") ||
              `Please inter the book total pages' number.`
          ]
        },
        data: {
          titleChina: ``,
          titleEnglish: ``,
          authorChina: ``,
          authorEnglish: ``,
          coverImgUrl: `https://res.cloudinary.com/imgcave/image/upload/v1599315698/Img/Book/defaultCover.png`,
          isbn: ``,
          press: ``,
          progress: ``
        },
        dataDefault: {
          titleChina: ``,
          titleEnglish: ``,
          authorChina: ``,
          authorEnglish: ``,
          coverImgUrl: `https://res.cloudinary.com/imgcave/image/upload/v1599315698/Img/Book/defaultCover.png`,
          isbn: ``,
          press: ``,
          progress: ``
        }
      },
      readBook: {
        cache: {
          addButton: false,
          recordOpen: false
        },
        records: [],
        record: {
          icon: {
            pageStart: `first_page`,
            pageEnd: `last_page`,
            timeStart: `hourglass_top`,
            timeEnd: `hourglass_bottom`,
            note: `notes`
          },
          color: {
            pageStart: "",
            pageEnd: "",
            timeStart: "",
            timeEnd: "",
            note: ""
          },
          label: {
            pageStart: "page start",
            pageEnd: "page end",
            timeStart: "start time",
            timeEnd: "end time",
            note: "note"
          },
          hint: {
            pageStart: "page hint",
            pageEnd: "",
            timeStart: "",
            timeEnd: "",
            note: ""
          },
          rule: {
            pageStart: [
              val => (val && val > 0) || "Must input and value bigger than 0."
            ],
            pageEnd: [
              val => (val && val > 0) || "Must input and value bigger than 0."
            ],
            timeStart: [val => (val && val.length === 14) || "Must input."],
            timeEnd: [val => (val && val.length === 14) || "Must input."],
            note: []
          },
          data: {
            bookId: null,
            pageStart: null,
            pageEnd: null,
            timeStart: "",
            timeEnd: "",
            note: ""
          },
          dataDefault: {
            bookId: null,
            pageStart: null,
            pageEnd: null,
            timeStart: "",
            timeEnd: "",
            note: ""
          }
        }
      }
    };
  },

  mounted() {
    this.getAllBook();
  },

  methods: {
    getAllBook() {
      getListAll()
        .then(res => {
          this.books.all = [...res.data].reverse();

          if (this.books.all.length === 0) {
            this.tab = "add";
          } else {
            this.books.nowSelectedBookId = this.books.all[0].id;
            this.getBookRecord(this.books.all[0].id);
          }
        })
        .catch(err => {
          console.error("--->err: ", err);
          this.books.nowSelectedBookId = 0;
          this.readBook.records = [];
        });
    },
    bookClicked(inId) {
      console.log(`--->Click: Id: ${inId} | typeOfId: ${typeof inId}`);
      this.books.nowSelectedBookId = inId;
      this.readBook.record.data.bookId = inId;
      this.getBookRecord(inId);
    },

    addBookSubmit() {
      this.addBook.cache.submit = true;

      const addBookObject = {
        titleChina: this.addBook.data.titleChina,
        titleEnglish: this.addBook.data.titleEnglish,
        authorChina: this.addBook.data.authorChina,
        authorEnglish: this.addBook.data.authorEnglish,
        coverImgUrl: this.addBook.data.coverImgUrl,
        isbn: this.addBook.data.isbn,
        press: this.addBook.data.press,
        progress: this.addBook.data.progress
      };

      console.log("--->addBookObject: ", addBookObject);
      addBook(addBookObject)
        .then(res => {
          console.log(`--->submit | OK | res: `, res);
          this.getAllBook();
          this.addBook.cache.submit = false;
          this.tab = `info`;
          this.addBookSubmitReset();
        })
        .catch(err => {
          console.log(`--->submit | Err | err: `, err);
          this.addBook.cache.submit = false;
        });
    },

    addBookSubmitReset() {
      this.addBook.data = JSON.parse(JSON.stringify(this.addBook.dataDefault));
    },

    getBookRecord(id) {
      this.readBook.record.data.bookId = this.books.nowSelectedBookId;

      getRecordById(id)
        .then(res => {
          if (res.data.length > 0) {
            this.readBook.records = [...res.data[0].records].reverse();
          } else {
            this.readBook.records = [];
          }
        })
        .catch(err => {
          console.log(`--->Record: err: `, err);
          this.readBook.records = [];
        });

        this.updateAddRecordButtonStatus()
    },

    updateAddRecordButtonStatus() {
      let res = true;

      // console.log("===>1:", this.books.all.length === 0);
      // console.log(
      //   "===>2:",
      //   this.books.all.filter(
      //     item => item.id === this.books.nowSelectedBookId
      //   )[0].done
      // );
      // console.log("===>3:", this.readBook.cache.recordOpen);

      if (this.books.all.length === 0) {
        res = false;
      }
      else if (
        this.books.all.filter(
          item => item.id === this.books.nowSelectedBookId
        )[0].done === true
      ) {
        res = false;
      }
      else if (this.readBook.cache.recordOpen === true) {
        res = false;
      }

      this.readBook.cache.addButton = res
    },
    addBookRecordSubmit() {
      console.log("--->New Record: date:", this.readBook.record.data);
      addBookReadRecord(this.readBook.record.data)
        .then(res => {
          console.log("===> addRecord: res: ", res.data);
          if (res.data.result === "success") {
            this.$q.notify({
              message: "Success | Add record success.",
              color: "positive",
              icon: "check",
              actions: [
                {
                  label: "Dismiss",
                  color: "white",
                  handler: () => {
                    /* ... */
                  }
                }
              ]
            });
            this.readBook.record.data = JSON.parse(
              JSON.stringify(this.readBook.record.dataDefault)
            );
            this.readBook.cache.recordOpen = false;
            this.getAllBook();
            // this.getBookRecord(this.books.nowSelectedBookId);
          } else if (res.data.result === "fail") {
            let infos = res.data.info;
            let message = "";
            for (let i = 0; i < infos.length; i++) {
              message =
                message +
                String(i + 1) +
                "." +
                infos[i].info +
                (i + 1 < infos.length ? " | " : "");
            }
            this.$q.notify({
              message: `Error : ${message}.`,
              multiLine: true,
              color: "negative",
              icon: "close",
              timeout: "10000",
              actions: [
                {
                  label: "Dismiss",
                  color: "white",
                  handler: () => {
                    /* ... */
                  }
                }
              ]
            });
          } else {
            this.$q.notify({
              message: `Error : There's no more information, please connect Administrator.`,
              multiLine: true,
              color: "negative",
              icon: "close",
              timeout: "10000",
              actions: [
                {
                  label: "Dismiss",
                  color: "white",
                  handler: () => {
                    /* ... */
                  }
                }
              ]
            });
          }
        })
        .catch(err => {
          console.log("===> addRecord: err: ", err);
        });
    },
    addBookRecordReset() {
      this.readBook.record.data = JSON.parse(
        JSON.stringify(this.readBook.record.dataDefault)
      );
      this.readBook.cache.recordOpen = false;
    }
  }
};
</script>

<style scoped>
.topListBox {
  /*border: 1px solid red;*/
  box-shadow: none;

  overflow: auto;
}
.topListBox::-webkit-scrollbar {
  width: 0 !important;
}
.topList {
  /*border: 1px solid lime;*/
  /*height: 240px;*/
  /*padding: 10px 10px;*/

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  /*flex-wrap: nowrap;*/
  /*overflow: auto;*/
  /*overflow-y: hidden;*/
  /*flex-basis: 10px;*/
  /*overflow: -moz-scrollbars-none*/
}
.topItemBox {
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin: 10px 10px;
}
.topItem {
  transition: all 0.4s;
  /*border: 1px solid greenyellow;*/
  width: 400px;
  height: 200px;
  /*margin: 0 400px;*/
  padding: 6px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.1);
}
.topItem:hover {
  transition: all 0.2s;
  /*border: 1px solid blue;*/
  box-shadow: 0 6px 8px 6px rgba(0, 0, 0, 0.3);
}
.topItemContent {
  /*border: 1px solid red;*/

  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
.topItemContentImg {
  /*border: 1px solid red;*/
  width: 30%;
  height: 150px;
}
.topItemContentInfo {
  /*border: 1px solid red;*/
  overflow: auto;
  width: 65%;
  height: 150px;
  padding: 4px;
}
.topItemContentInfo::-webkit-scrollbar {
  width: 0 !important;
}
.topItemContentInfo > div {
  /*border: 1px solid green;*/
  word-wrap: break-word;
}
</style>
