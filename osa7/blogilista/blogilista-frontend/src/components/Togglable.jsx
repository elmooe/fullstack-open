import { useState, useImperativeHandle, forwardRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  margin: 0 auto;
`

const ToggleButton = styled.button`
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #0eaa76ff;
  }
`

const CancelButton = styled.button`
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #0eaa76ff;
  }
`

const Content = styled.div`
  margin-top: 16px;
`

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <Container>
      {!visible && (
        <ToggleButton onClick={toggleVisibility}>
          {props.buttonLabel}
        </ToggleButton>
      )}

      {visible && (
        <Content $visible={visible}>
          {props.children}
          <CancelButton onClick={toggleVisibility}>Cancel</CancelButton>
        </Content>
      )}
    </Container>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
Togglable.displayName = 'Togglable'

export default Togglable
