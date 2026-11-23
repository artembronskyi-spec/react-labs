import { createContext, use, useState } from 'react'

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

  return (
    <TabsContext value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext>
  )
}

function TabsList({ children, ...props }) {
  return (
    <div className="tab-list" {...props}>
      {children}
    </div>
  )
}

function TabsTab({ value, children }) {
  const { activeTab, setActiveTab } = useTabsContext('Tabs.Tab')
  const isActive = activeTab === value

  return (
    <button
      type="button"
      className={isActive ? 'active' : ''}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

function TabsPanel({ value, children }) {
  const { activeTab } = useTabsContext('Tabs.Panel')
  const isActive = activeTab === value

  return <div hidden={!isActive}>{children}</div>
}

Tabs.List = TabsList
Tabs.Tab = TabsTab
Tabs.Panel = TabsPanel  