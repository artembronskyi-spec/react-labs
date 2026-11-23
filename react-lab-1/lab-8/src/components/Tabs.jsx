import { createContext, use, useId, useState } from 'react'

const TabsContext = createContext(null)

function useTabsContext(componentName) {
  const context = use(TabsContext)
  if (!context) {
    throw new Error(`${componentName} must be used within <Tabs>`)
  }
  return context
}

export default function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue)
  const baseId = useId()

  const getTabId = (value) => `${baseId}-tab-${value}`
  const getPanelId = (value) => `${baseId}-panel-${value}`

  return (
    <TabsContext value={{ activeTab, setActiveTab, getTabId, getPanelId }}>
      <div className="tabs">{children}</div>
    </TabsContext>
  )
}

function TabsList({ children, onKeyDown, ...props }) {
  function handleKeyDown(e) {
    onKeyDown?.(e)

    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End']
    if (!keys.includes(e.key)) return

    const tabs = Array.from(e.currentTarget.querySelectorAll('[role="tab"]'))
    const currentIndex = tabs.indexOf(e.target)
    if (currentIndex === -1) return

    e.preventDefault()

    let nextIndex = currentIndex
    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabs.length
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    } else if (e.key === 'Home') {
      nextIndex = 0
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1
    }

    const nextTab = tabs[nextIndex]
    nextTab.focus()
    nextTab.click()
  }

  return (
    <div
      role="tablist"
      className="tab-list"
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  )
}

function TabsTab({ value, children }) {
  const { activeTab, setActiveTab, getTabId, getPanelId } =
    useTabsContext('Tabs.Tab')
  const isActive = activeTab === value

  return (
    <button
      type="button"
      role="tab"
      id={getTabId(value)}
      aria-selected={isActive}
      aria-controls={getPanelId(value)}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

function TabsPanel({ value, children }) {
  const { activeTab, getTabId, getPanelId } = useTabsContext('Tabs.Panel')
  const isActive = activeTab === value

  return (
    <div
      role="tabpanel"
      id={getPanelId(value)}
      aria-labelledby={getTabId(value)}
      tabIndex={0}
      hidden={!isActive}
    >
      {children}
    </div>
  )
}

Tabs.List = TabsList
Tabs.Tab = TabsTab
Tabs.Panel = TabsPanel
