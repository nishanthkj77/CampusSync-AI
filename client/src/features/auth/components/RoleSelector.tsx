 import type { UserRole } from '../types/auth.types'

type RoleSelectorProps = {
  selectedRole: UserRole
  onRoleChange: (role: UserRole) => void
}

const roles: { label: string; value: UserRole }[] = [
  { label: 'Student', value: 'student' },
  { label: 'Faculty', value: 'faculty' },
  { label: 'HOD', value: 'hod' },
  { label: 'Admin', value: 'admin' },
]

const RoleSelector = ({ selectedRole, onRoleChange }: RoleSelectorProps) => {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-slate">
        Select Role
      </label>

      <div className="grid grid-cols-2 gap-2">
        {roles.map((role) => {
          const isActive = selectedRole === role.value

          return (
            <button
              key={role.value}
              type="button"
              onClick={() => onRoleChange(role.value)}
              className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-signal bg-signal-soft text-signal'
                  : 'border-line bg-ink-soft text-slate hover:border-paper-dim hover:text-paper'
              }`}
            >
              {role.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default RoleSelector