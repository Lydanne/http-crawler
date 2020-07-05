const { HttpCrawler } = require('../dist/http-crawler.cjs');

const clicli = new HttpCrawler(
  {
    meta: {
      name: 'CliCli',
      version: 1,
      search: '超电磁'
    },
    option: {
      delay: 300, //ms
      errRetry: 5, // 重试次数
    },
    steps: [
      {
        url: 'https://api.clicli.us/search/posts',
        params: {
          key: '{{v-meta=$.search}}'
        },
        resultModel: {
          id: '{{v-response=$.data.posts[*].id}}',
          title: '{{v-response=$.data.posts[*].title}}',
        },
      },
      {
        url: 'https://api.clicli.us/videos',
        method: 'get',
        params: {
          pid: '{{v-prev-mres=$[*].id}}',
          page: '1',
          pageSize: '150'
        },
        isMergeResult:false,
        resultModel: {
          oid: '第{{v-response=$.data.videos[*].oid}}集 {{v-response=$.data.videos[*].title}}',
          url: '{{v-response=$.data.videos[*].content}}',
        },
      }
    ]
  });

const okzyw = new HttpCrawler(
  {
    meta: {
      name: 'okzyw',
      version: 1,
      search: '超电磁'
    },
    option: {
      delay: 300, //ms
      errRetry: 5, // 重试次数
    },
    steps: [
      {
        url: 'http://okzyw.com/index.php?m=vod-search',
        method: 'post',
        dataType:'formdata',
        data: {
          wd: '{{v-meta=$.search}}',
          submit: 'search'
        },
        resultModel: {
          title: '{{v-response-html=.xing_vb4|$[*].structuredText}}',
          router: '{{v-response-html=.xing_vb4|$[*].firstChild.attributes.href}}',
        },
      },
      {
        key:'voides',
        url: 'http://okzyw.com{{v-prev-mres=$[*].router}}',
        method: 'get',
        isMergeResult:false,
        resultModel: {
          title: '{{v-response-html=[name=copy_sel]|$[*].parentNode.structuredText}}',
          voideUrl: '{{v-response-html=[name=copy_sel]|$[*].attributes.value}}',
        },
      }
    ]
  });

// okzyw.on('start',()=>{
//   console.log('开始');
// })

// okzyw.on('end',()=>{
//   console.log('结束');
// })

// okzyw.on('err',(error)=>{
//   console.log(error);
// })

// okzyw.on('go:before',({ state })=>{
//   console.log('开始第'+(state.current)+'步');
// })

// okzyw.on('go:after',({state})=>{
//   console.log('完成第'+(state.current)+'步');
// })

async function main(params) {
  // const res1 = await clicli.go();
  // console.log(res1);
  // const res2 = await clicli.go();
  // console.log(res2);
  // const results = (clicli.mergeResult());
  // console.log(results);
  
  const res1 = await okzyw.go({ search:"超电磁" });
  console.log(res1);
  const res2 = await okzyw.go();
  console.log(res2);
  const results = (okzyw.mergeResult());
  console.log(results);
  
  
}

main();