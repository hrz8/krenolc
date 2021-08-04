<script lang="ts">
  import {
    TabContent, TabPane, Col, Container, Row, Card, CardBody
  } from 'sveltestrap/src'
  import Tree from '../../components/editor/tree.svelte'

  const trees = [
    {
      label   : 'conversation',
      children: [
        {
          label: 'start'
        },
        {
          label: 'end'
        },
        {
          label: 'California'
        },
        {
          label: 'San Francisco'
        },
        {
          label: 'Los Angeles'
        },
        {
          label: 'Sacramento'
        }
      ]
    },
    {
      label: 'handover'
    }
  ]
</script>

<svelte:head>
  <title>Editor</title>
</svelte:head>

<Container class="mt-4">
  <Row>
    <Col lg="4">
      <Card>
        <CardBody>
          <TabContent>
            <TabPane tabId="node" tab="Node" style="height: 75vh; overflow-y: auto;" active>
              <div class="mt-3">
                {#each trees as tree}
                  <Tree {tree} />
                {/each}
              </div>
            </TabPane>
            <TabPane tabId="trigger" tab="Trigger" style="height: 75vh; overflow-y: auto;" >
              <div class="mt-3">
                {#each trees as tree}
                  <Tree {tree} />
                {/each}
              </div>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </Col>
  </Row>
</Container>
