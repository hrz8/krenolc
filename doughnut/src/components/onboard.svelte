<script>
  import {
    TabContent, TabPane, InputGroup, InputGroupText, Input, Row, Col, Button
  } from 'sveltestrap/src'

  let inputValue = ''
</script>

<div style="padding: 20px">
  <TabContent pills>
    <TabPane tabId="newBot" tab="New Bot" active>
      <Row>
        <Col xs="6">
          <div class="mt-4 mx-2">
            <InputGroup>
              <InputGroupText>Bot Name</InputGroupText>
              <Input bind:value={inputValue} />
            </InputGroup>
            <Button class="float-end mt-2" color="primary">Create</Button>
            </div>
        </Col>
      </Row>
    </TabPane>
    <TabPane tabId="acceptInvitation" tab="Accept Invitation">
      <img
        alt="Johnny Bravo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Johnny_Bravo_series_logo.png/320px-Johnny_Bravo_series_logo.png"
      />
    </TabPane>
  </TabContent>
</div>
