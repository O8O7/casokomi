from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

User = get_user_model()


class UserAdminCustom(UserAdmin):
    # ユーザー詳細
    fieldsets = (
        (None, {
            'fields': (
                'name',
                'email',
                'password',
                'image',
                'introduction',
                'is_active',
                'is_staff',
                'is_superuser',
            ),
        }),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'name',
                'email',
                'password1',
                'password2',
                'image',
                'introduction',
                'is_active',
                'is_staff',
                'is_superuser',
            ),
        }),
    )

    # ユーザー一覧
    list_display = (
        'id',
        'name',
        'email',
        'is_active'
    )

    list_filter = ()
    list_display_links = ('id', 'name', 'email')
    # 検索
    search_fields = ('email',)
    # 順番
    ordering = ('id',)


admin.site.register(User, UserAdminCustom)
