--[[
  ~ dumper · customs · dota2
  ~ credits: rou (a.k.a internetenemy), qfun(a.k.a qfun_g9s)
  ~ special for t.me/wildguild

  ~ build 1a5b3bb 
  ~ auto-generated — do not edit
]]


--沉默术士光环
--注意：本文件是由 LinkLuaModifier 单独载入的，**拿不到 addon_game_mode.lua 里的全局函数**
--（IsUnitExist / GetValidChessOnBoard / play_particle 这些在别的文件里定义，这里调用会是 nil）
--所以这里只放不依赖工程全局的东西：图标、特效、弹道、攻击命中判定；
--"找光环范围内的队友"那段逻辑放在 addon_game_mode.lua 的 SilAuraTick() 里，由主文件的定时器驱动。

--本地小工具：安全判断单位是否有效
local function sil_unit_valid(u)
	if u == nil then
		return false
	end
	if u.IsNull == nil then
		return false
	end
	return u:IsNull() == false
end

local GLAIVES_PROJECTILE = "particles/units/heroes/hero_silencer/silencer_glaives_of_wisdom.vpcf"

--光环本体（挂在沉默术士身上，只做标记，不加视觉）
modifier_sil_aura = class({})

function modifier_sil_aura:IsHidden()
	return true
end

function modifier_sil_aura:IsPurgable()
	return false
end

function modifier_sil_aura:IsPermanent()
	return true
end

function modifier_sil_aura:RemoveOnDeath()
	return false
end

--光环增益（挂在范围内的队友身上）
modifier_sil_aura_buff = class({})

--可见的 modifier：在 buff 栏里显示图标
function modifier_sil_aura_buff:IsHidden()
	return false
end

function modifier_sil_aura_buff:IsPurgable()
	return false
end

function modifier_sil_aura_buff:IsDebuff()
	return false
end

function modifier_sil_aura_buff:IsBuff()
	return true
end

function modifier_sil_aura_buff:GetTexture()
	return "silencer_glaives_of_wisdom"
end

function modifier_sil_aura_buff:IsPermanent()
	return false
end

function modifier_sil_aura_buff:GetDuration()
	return self.duration or 0.8
end

--=========================================================
--弹道：只有「这次攻击触发了沉默」的那一下才换成智慧之刃弹道
--（弹道是在攻击开始时生成的，所以必须在 ON_ATTACK_START 里就决定，不能等命中）
--=========================================================
function modifier_sil_aura_buff:SwitchProjectileToGlaives()
	local parent = self:GetParent()
	if sil_unit_valid(parent) == false then
		return
	end
	--近战没有弹道
	if parent:IsRangedAttacker() == false then
		return
	end
	if self.swapped == true then
		return
	end
	local ok, orig = pcall(function()
		return parent:GetRangedProjectileName()
	end)
	--拿不到原始弹道就不换，否则还原不回来会把弹道弄没
	if ok == false or orig == nil or orig == "" then
		return
	end
	self.orig_projectile = orig
	self.swapped = true
	parent:SetRangedProjectileName(GLAIVES_PROJECTILE)
end

function modifier_sil_aura_buff:RestoreProjectile()
	if self.swapped ~= true then
		return
	end
	self.swapped = false
	local parent = self:GetParent()
	if sil_unit_valid(parent) == false then
		return
	end
	parent:SetRangedProjectileName(self.orig_projectile or "")
end

--=========================================================
--事件
--=========================================================
function modifier_sil_aura_buff:DeclareFunctions()
	return { MODIFIER_EVENT_ON_ATTACK_START, MODIFIER_EVENT_ON_ATTACK_LANDED }
end

function modifier_sil_aura_buff:OnCreated(kv)
	self.duration = (kv and kv.duration) or 0.8
	self.pending_procs = 0
end

function modifier_sil_aura_buff:OnRefresh(kv)
	self.duration = (kv and kv.duration) or 0.8
end

--攻击开始：先还原上一次的弹道，再掷骰决定这一下要不要变成智慧之刃弹道
function modifier_sil_aura_buff:OnAttackStart(keys)
	if IsServer() == false then
		return
	end
	if keys.attacker ~= self:GetParent() then
		return
	end
	self:RestoreProjectile()

	local ability = self:GetAbility()
	if ability == nil then
		return
	end
	local chance = ability:GetSpecialValueFor("aura_chance") or 50
	if chance <= 0 or RandomInt(1, 100) > chance then
		return
	end
	--这一下命中后会沉默，弹道跟着换成智慧之刃
	self.pending_procs = (self.pending_procs or 0) + 1
	if self.pending_procs > 2 then
		self.pending_procs = 2
	end
	self:SwitchProjectileToGlaives()
end

--命中：这一下如果是掷骰成功的，就给目标附加魔法伤害 + 沉默 + 爆裂特效
function modifier_sil_aura_buff:OnAttackLanded(keys)
	if IsServer() == false then
		return
	end
	if keys.attacker ~= self:GetParent() then
		return
	end
	if (self.pending_procs or 0) <= 0 then
		return
	end
	self.pending_procs = self.pending_procs - 1
	self:RestoreProjectile()

	local target = keys.target
	if sil_unit_valid(target) == false then
		return
	end
	local caster = self:GetCaster()
	if sil_unit_valid(caster) == false then
		return
	end
	local ability = self:GetAbility()
	if ability == nil then
		return
	end

	--【1】额外魔法伤害（默认 100，改 KV 里的 aura_damage 即可）
	--伤害算「发动这次攻击的队友棋子」造成的，不算沉默术士的（击杀/金钱/伤害统计都归棋子）
	local attacker_unit = self:GetParent()
	local dmg = ability:GetSpecialValueFor("aura_damage") or 100
	if dmg > 0 then
		ApplyDamage({
			victim = target,
			attacker = attacker_unit,
			damage = dmg,
			damage_type = DAMAGE_TYPE_MAGICAL,
		})
	end

	--【2】沉默（已经处于沉默中就不重复上）
	--和战吼保持一致：只对有蓝条（有法力值）的目标生效，无蓝条棋子不吃沉默
	if target:HasModifier("modifier_sil_silence_all") == false and target:GetMaxMana() > 0 then
		local dur = ability:GetSpecialValueFor("aura_duration") or 2
		ability:ApplyDataDrivenModifier(caster, target, "modifier_sil_silence_all", { duration = dur })
	end

	--【3】触发时在目标身上炸一下（智慧之刃的爆裂特效）
	local fx = ParticleManager:CreateParticle(
		"particles/units/heroes/hero_silencer/silencer_glaives_of_wisdom_explosion.vpcf",
		PATTACH_ABSORIGIN_FOLLOW,
		target
	)
	ParticleManager:SetParticleControl(fx, 0, target:GetAbsOrigin())
	ParticleManager:ReleaseParticleIndex(fx)
end

--离开光环：还原弹道 + 清掉头顶特效（头顶特效由主文件创建，句柄挂在棋子身上）
function modifier_sil_aura_buff:OnDestroy()
	if IsServer() == false then
		return
	end
	self:RestoreProjectile()

	local parent = self:GetParent()
	if sil_unit_valid(parent) and parent.sil_aura_hat ~= nil then
		ParticleManager:DestroyParticle(parent.sil_aura_hat, true)
		ParticleManager:ReleaseParticleIndex(parent.sil_aura_hat)
		parent.sil_aura_hat = nil
	end
end