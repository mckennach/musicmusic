import { PanelProps as Panel } from 'react-resizable-panels'
import {
  PanelOnCollapse,
  PanelOnExpand,
  PanelOnResize
} from 'react-resizable-panels'

export interface PanelProps extends Panel {
  children: React.ReactNode
  className?: string | undefined
  collapsedSize?: number | undefined
  collapsible?: boolean | undefined
  defaultSize?: number | undefined
  defaultPosition?: number | undefined
  id?: string | undefined
  maxSize?: number | undefined
  minSize?: number | undefined
  onCollapse?: PanelOnCollapse | undefined
  onExpand?: PanelOnExpand | undefined
  onResize?: PanelOnResize | undefined
  order?: number | undefined
  style?: object | undefined
  tagName?: keyof HTMLElementTagNameMap | undefined
  isCollapsed?: boolean | undefined
}
