const { HttpCrawler } = require('../dist/http-crawler.cjs');

const clicli = new HttpCrawler(
  ({
    meta: {
      name: 'clicli',
      home: 'clicli.me',
      version: '202007047',
      search: '超电磁'
    },
    option: {
      delay: 300, //ms
      errRetry: 5, // 重试次数
    },
    steps: [
      {
        url: 'http://api.clicli.us/search/posts',
        params: {
          key: '{{v-meta=search}}'
        },
        resultModel: {
          home: '{{v-meta=home}}',
          id: '{{v-resp=data.posts[*].id}}',
          title: '{{v-resp=data.posts[*].title}}',
        },
      },
      {
        key: 'voides',
        url: 'http://api.clicli.us/videos',
        method: 'get',
        params: {
          pid: '{{v-prev-resu=[*].id}}',
          page: '1',
          pageSize: '150'
        },
        isMergeResult: false,
        resultModel: {
          name: '第{{v-resp=data.videos[*].oid}}集 {{v-resp=data.videos[*].title}}',
          url: '{{v-resp=data.videos[*].content}}'
        },
      }
    ]
  })
);

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
          wd: '{{v-meta=search}}',
          submit: 'search'
        },
        resultModel: {
          title: '{{v-resp-html=.xing_vb4|[*].structuredText}}',
          router: '{{v-resp-html=.xing_vb4|[*].firstChild.attributes.href}}',
        },
      },
      {
        key:'voides',
        url: 'http://okzyw.com{{v-prev-resu=[*].router}}',
        method: 'get',
        isMergeResult:false,
        resultModel: {
          title: '{{v-resp-html=[name=copy_sel]|[*].parentNode.structuredText}}',
          voideUrl: '{{v-resp-html=[name=copy_sel]|[*].attributes.value}}',
        },
      }
    ]
  });

clicli.on('start',()=>{
  console.log('开始');
})

clicli.on('end',()=>{
  console.log('结束');
})

clicli.on('err',(error)=>{
  console.log(error);
})

clicli.on('go:before',({ state })=>{
  console.log('开始第'+(state.current)+'步');
})

clicli.on('go:after',({state})=>{
  console.log('完成第'+(state.current)+'步');
})

clicli.on('request',(req)=>{
  console.log(req);
})

clicli.on('response',(res)=>{
  console.log(res);
})

async function main(params) {
  const res1 = await clicli.run({ search:"超电磁炮" });
  console.log(res1);
}

main();