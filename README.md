# checkResizeAds

init
```
<div class="ads-block"><ins/></div>
```

```
<script>
$(function () {
        $('.ads-block').CheckResizeAds({
                debug: true,
                notEmptyCallBack: function ( ele, adstype) {
                    console.log(adstype);
                },
                EmptyCallBack: function ( ele, adstype) {
                    console.log(adstype);
                }
        });
})
</script>
```
