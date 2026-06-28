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

const RoleSelector = ({
  selectedRole,
  onRoleChange,
}: RoleSelectorProps) => {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-slate-300">
        Select Role
      </label>

      <div className="grid grid-cols-2 gap-3">
        {roles.map((role) => (
          <button
            key={role.value}
            type="button"
            onClick={() => onRoleChange(role.value)}
            className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
              selectedRole === role.value
                ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                : 'border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/50 hover:text-white'
            }`}
          >
            {role.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default RoleSelector