import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 mb-6">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={index} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-text-secondary hover:text-text-primary transition-colors text-sm"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`text-sm ${
                  isLast ? 'text-text-primary' : 'text-text-secondary'
                }`}
              >
                {item.label}
              </span>
            )}

            {!isLast && (
              <ChevronRight className="w-4 h-4 text-text-tertiary" />
            )}
          </div>
        )
      })}
    </nav>
  )
}
