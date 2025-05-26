import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string
  text?: string
  children?: React.ReactNode
  breadcrumbs?: {
    title: string
    href: string
  }[]
  actions?: React.ReactNode
}

export function PageHeader({ heading, text, children, breadcrumbs, actions, className, ...props }: PageHeaderProps) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={breadcrumb.href}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={breadcrumb.href} isActive={index === breadcrumbs.length - 1}>
                    {breadcrumb.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <div className="flex items-center justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
          {text && <p className="text-muted-foreground">{text}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  )
}
