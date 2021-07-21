<script>
  import {
    TabContent, TabPane
} from 'sveltestrap'
</script>

<div style="padding: 20px">
  <TabContent pills>
    <TabPane tabId="alpha" tab="New Bot" active>
      <img
        alt="Alpha Flight"
        src="https://upload.wikimedia.org/wikipedia/en/4/49/Alpha_Flight_cast_picture_%28John_Byrne_era%29.gif"
      />
    </TabPane>
    <TabPane tabId="bravo" tab="Accept Invitation">
      <img
        alt="Johnny Bravo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Johnny_Bravo_series_logo.png/320px-Johnny_Bravo_series_logo.png"
      />
    </TabPane>
  </TabContent>
</div>
