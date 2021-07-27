<script>
  import {
    TabContent,
    TabPane,
    InputGroup,
    InputGroupText,
    Input,
    Row,
    Col,
    Button,
    Card
  } from 'sveltestrap/src'

  let botName = ''
  let invitationCode = ''
</script>

<div style="padding: 20px">
  <TabContent pills>
    <TabPane tabId="newBot" tab="New Bot" active>
      <Row>
        <Col xs="6">
            <Card body class="mt-4 mx-2">
              <InputGroup>
                <InputGroupText>Bot Name</InputGroupText>
                <Input bind:value={botName} />
              </InputGroup>
              <Button class="mt-2" color="primary">Create</Button>
            </Card>
          </Col>
      </Row>
    </TabPane>
    <TabPane tabId="acceptInvitation" tab="Accept Invitation">
      <Row>
        <Col xs="6">
            <Card body class="mt-4 mx-2">
              <InputGroup>
                <InputGroupText>Invitation Code</InputGroupText>
                <Input bind:value={invitationCode} />
              </InputGroup>
              <Button class="mt-2" color="primary">Apply</Button>
            </Card>
          </Col>
      </Row>
    </TabPane>
  </TabContent>
</div>
